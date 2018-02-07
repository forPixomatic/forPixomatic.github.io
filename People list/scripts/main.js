$(()=> {
var colors = ['#fad6d6','#dfdbdb', '#e5eaa0', '#e7e1f0', '#c9e0ea', '#eac9e3','#fffdd6'];
var counter = 0;
$('#enter').on('click', function (e) {
    if($('#name').val() == ''){
        return false;
    }
    var $listItem = $('<li/>');
    $('#peopleList').append($listItem);
    $($listItem).text($('#name').val());
    var index = counter % colors.length;
    $($listItem).css('background-color', colors[index]);
    $('#name').val('');
    counter++;
});
    $( function() {
        $( "#peopleList" ).sortable({
            start: function( event, ui ) {
                if ($('li').length < 7){
                    alert('Please fill at least 7 names');
                    event.stopPropagation();
                }
            }
        });
        $( "#peopleList" ).disableSelection();
  });
    $('#name').keypress(function(e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        $("#enter").click();
    }
});
});