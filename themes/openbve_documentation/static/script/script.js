$(function() {
    $(document).ready(function() {
        var $select = $('.language-selector').select2({width: 'resolve'});
        var url = location.href;
        if (url.search(/\/en\//) !== -1) {
            $select.val('en').trigger('change');
        } else if (url.search(/\/ja\//) !== -1) {
            $select.val('ja').trigger('change');
        }
    });

    $('.language-selector').on('select2:select', function (e) {
        var url = location.href;
        if (url.search(/\/en\//) !== -1) {
            location.href = url.replace(/\/en\//, `/${e.params.data.id}/`);
        } else if (url.search(/\/ja\//) !== -1) {
            location.href = url.replace(/\/ja\//, `/${e.params.data.id}/`);
        }
    });
});