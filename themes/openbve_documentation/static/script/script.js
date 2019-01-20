$(function() {
    $(document).ready(function() {
        var $select = $('.language-selector').select2({width: 'resolve'});
    });

    $('.language-selector').on('select2:select', function (e) {
        location.href = e.params.data.id;
    });
});