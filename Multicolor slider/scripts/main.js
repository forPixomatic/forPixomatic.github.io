$(()=> {
(function() {
  var update_handle_track_pos;

  update_handle_track_pos = function(slider, ui_handle_pos) {
    var handle_track_xoffset, slider_range_inverse_width;
    handle_track_xoffset = -((ui_handle_pos / 100) * slider.clientWidth);
    $(slider).find(".handle-track").css("left", handle_track_xoffset);
    slider_range_inverse_width = (100 - ui_handle_pos) + "%";
    return $(slider).find(".slider-range-inverse").css("width", slider_range_inverse_width);
  };

  $("#js-slider").slider({
    range: 'max',
    max: 100,
    value: 50,
    create: function(event, ui) {
      var slider;
      slider = $(event.target);
      
      slider.find('.ui-slider-handle').append('<span class="dot"><span class="handle-track"></span></span>');
      $('.ui-slider-handle').attr('data-tooltip', 'tooltip');
        
      var showingTooltip;
      $('.ui-slider-handle').on('mouseover',  function(e) {

          var target = $('.ui-slider-handle')[0];
          var $tooltip = $('.ui-slider-handle').attr('data-tooltip');
          if (!$tooltip) return;

          var $tooltipElem = $('<div/>');
          $tooltipElem.addClass('tooltip');
          
          var currentColor = getColor(e.offsetX, e.offsetY);
          $tooltipElem.html(currentColor);
          
          $('.ui-slider-handle').append($tooltipElem);
          var coords = target.getBoundingClientRect();

          var left = coords.left + (target.offsetWidth - $tooltipElem[0].offsetWidth) / 2;
          if (left < 0) left = 0;

          var top = coords.top - $tooltipElem[0].offsetHeight - 5;
          if (top < 0) {
            top = coords.top + target.offsetHeight - 5;
          }

          $tooltipElem[0].style.left = left + 'px';
          $tooltipElem[0].style.top = top + 'px';

          showingTooltip = $tooltipElem;
    });

    $('.ui-slider-handle').on('mouseout', function(e) {

      if (showingTooltip) {
        showingTooltip.remove();
        showingTooltip = null;
      }

    });
      
      slider.prepend('<div class="slider-range-inverse"></div>');
      slider.find(".handle-track").css("width", event.target.clientWidth);
      return update_handle_track_pos(event.target, $(this).slider("value"));
    },
    slide: function(event, ui) {
      return update_handle_track_pos(event.target, ui.value);
    }
  });
}).call(this);
});
function getColor(x, y){
    var canvas = document.createElement('canvas');
    var ctx=canvas.getContext("2d");
    ctx.fillStyle = $('.ui-slider-handle').css("background");
    //apply width and heigh 1px
    var pixelData = ctx.getImageData(x, y, 1, 1).data;
    return hexc(pixelData);
}
function hexc(parts) {
    for (var i = 0; i <= 2; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
    return color;
}