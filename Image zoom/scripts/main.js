$(()=> {
    $('#select').on('change', function (e) {
            if (this.files && this.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    $('#upload')
                        .attr('src', e.target.result)
                        .css('visibility', 'visible');
                };
                reader.readAsDataURL(this.files[0]);
            }
});
    $("#upload").resizable({
        handles: "n, e, s, w, ne, se, sw, nw",
        maxHeight: 600,
        maxWidth: 600,
        minHeight: 150,
        minWidth: 150
    });
});