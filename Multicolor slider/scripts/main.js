$(()=> {
(function() {
  // Helper function
  var update_handle_track_pos;

  update_handle_track_pos = function(slider, ui_handle_pos) {
    var handle_track_xoffset, slider_range_inverse_width;
    handle_track_xoffset = -((ui_handle_pos / 100) * slider.clientWidth);
    $(slider).find(".handle-track").css("left", handle_track_xoffset);
    slider_range_inverse_width = (100 - ui_handle_pos) + "%";
    return $(slider).find(".slider-range-inverse").css("width", slider_range_inverse_width);
  };

  // Init slider
  $("#js-slider").slider({
    range: "min",
    max: 100,
    value: 50,
    create: function(event, ui) {
      var slider;
      slider = $(event.target);
      
      // Append the slider handle with a center dot and it's own track
      slider.find('.ui-slider-handle').append('<span class="dot"><span class="handle-track"></span></span>');
      $('.ui-slider-handle').attr('data-tooltip', 'tooltip');
        
      var showingTooltip;
      $('.ui-slider-handle').on('mouseover',  function(e) {

          var target = $('.ui-slider-handle')[0];
          var $tooltip = $('.ui-slider-handle').attr('data-tooltip');
          if (!$tooltip) return;

          var $tooltipElem = $('<div/>');
          $tooltipElem.addClass('tooltip');
          var currentColor = $('.handle-track').css('backgroundColor');
          var hexColor = hexc(currentColor);
          $tooltipElem.html(hexColor);
          
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
      // Append the slider with an inverse range
      slider.prepend('<div class="slider-range-inverse"></div>');
      
      // Set initial dimensions
      slider.find(".handle-track").css("width", event.target.clientWidth);
      
      // Set initial position for tracks
      return update_handle_track_pos(event.target, $(this).slider("value"));
    },
    slide: function(event, ui) {
      // Update position of tracks
      return update_handle_track_pos(event.target, ui.value);
    }
  });
}).call(this);
});
function hexc(colorval) {
    var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    delete(parts[0]);
    for (var i = 1; i <= 3; ++i) {
        parts[i] = parseInt(parts[i]).toString(16);
        if (parts[i].length == 1) parts[i] = '0' + parts[i];
    }
    color = '#' + parts.join('');
    return color;
}