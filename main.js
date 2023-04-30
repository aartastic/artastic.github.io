const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      const brushSizeSlider = document.getElementById("brush-size");
      let lastPoint = null;
      let strokeWidth = 5;
      let isDrawing = false;
      let lastX = 0;
      let lastY = 0;
      let hue = 0;
      let brushSize = brushSizeSlider.value;
      let brushColor = document.getElementById("brush-color").value;
      let history = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
      let historyIndex = 0;
      function draw(e) {
        if (!isDrawing) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(
          (e.offsetX * canvas.width) / canvas.clientWidth,
          (e.offsetY * canvas.height) / canvas.clientHeight
        );
        ctx.strokeStyle = brushColor;
        ctx.lineWidth = brushSize;
        ctx.stroke();
        [lastX, lastY] = [
          (e.offsetX * canvas.width) / canvas.clientWidth,
          (e.offsetY * canvas.height) / canvas.clientHeight,
        ];  
      }

      canvas.addEventListener("mousedown", (e) => {
        isDrawing = true;
        [lastX, lastY] = [
          (e.offsetX * canvas.width) / canvas.clientWidth,
          (e.offsetY * canvas.height) / canvas.clientHeight,
        ];
      });

      canvas.addEventListener("mousemove", draw);
      canvas.addEventListener("mouseup", () => {
        isDrawing = false;
        history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        historyIndex++;
      });
      canvas.addEventListener("mouseout", () => (isDrawing = false));

      brushSizeSlider.addEventListener("input", () => {
        brushSize = brushSizeSlider.value;
      });

      document.getElementById("brush-color").addEventListener("change", (e) => {
        brushColor = e.target.value;
      });

      document.getElementById("erase").addEventListener("click", () => {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,0)";
        ctx.lineWidth = brushSize;
      });

      document.getElementById("undo").addEventListener("click", () => {
        if (historyIndex > 0) {
          historyIndex--;
          ctx.putImageData(history[historyIndex], 0, 0);
        }
      });

      document.getElementById("redo").addEventListener("click", () => {
        if (historyIndex < history.length - 1) {
          historyIndex++;
          ctx.putImageData(history[historyIndex], 0, 0);
        }
      });

      document.getElementById("clear").addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        history = [ctx.getImageData(0, 0, canvas.width, canvas.height)];
        historyIndex = 0;
      });
      document.getElementById("pen").addEventListener("click", () => {
        ctx.globalCompositeOperation = "source-over";
      });
      function downloadCanvas() {
        var canvas = document.getElementById("canvas");
        var downloadLink = document.createElement('a');
        downloadLink.setAttribute('download', 'drawing.png');
        canvas.toBlob(function(blob) {
          var url = URL.createObjectURL(blob);
          downloadLink.setAttribute('href', url);
          downloadLink.click();
          URL.revokeObjectURL(url);
        });
      }