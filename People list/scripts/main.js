$(()=> {
var colors = ['#ffdfdf','#e0e0e0', '#e8eac9', '#e7e1f0', '#c9e0ea', '#eac9e3','#fffdd6'];
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
    $("#name").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#enter").click();
    }
});
});