$(function() {
    url = window.location.href;
    $('#en').css('font-weight', '600');
    $('#ja').css('font-weight', '600');
    if (url.search(/\/en\//) !== -1) {
        $('#en').css('color', '#BBBBBB');
        $('#ja').css('color', '#0080FF');
    } else if (url.search(/\/ja\//) !== -1) {
        $('#en').css('color', '#0080FF');
        $('#ja').css('color', '#BBBBBB');
    }

    $(document).on('mouseover', '#en', function() {
        $('#en').css('cursor','pointer');
    });

    $(document).on('mouseover', '#ja', function() {
        $('#ja').css('cursor','pointer');
    });

    $(document).on('click', '#en', function() {
        var x = location.href;
        location.href = x.replace(/\/ja\//, "/en/");
    });

    $(document).on('click', '#ja', function() {
        var x = location.href;
        location.href = x.replace(/\/en\//, "/ja/");
    });
});