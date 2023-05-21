document.addEventListener('DOMContentLoaded', function() {
    var rangePercent = document.querySelector('[type="range"]').value;
    var rangeInput = document.querySelector('[type="range"]');
    var h4Element = document.querySelector('h4');
  
    rangeInput.addEventListener('input', function() {
      rangePercent = rangeInput.value;
      h4Element.innerHTML = rangePercent + '<span></span>';
      var elementsToStyle = document.querySelectorAll('[type="range"], h4>span');
      elementsToStyle.forEach(function(element) {
        element.style.filter = 'hue-rotate(-' + rangePercent + 'deg)';
      });
      h4Element.style.transform = 'translateY(-50%) scale(' + (1 + (rangePercent / 100)) + ')';
      h4Element.style.top = rangePercent + '%';
    });
  });
  