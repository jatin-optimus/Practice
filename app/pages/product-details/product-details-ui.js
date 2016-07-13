define([
    '$',
    'hijax'
], function($, Hijax) {
    var initHijax = function() {
        var hijax = new Hijax();

        hijax.set(
            'add-to-cart',
            function(url) {
                return url.indexOf('shoppingCartSummaryNew') > -1;
            }, {
                complete: function(data, xhr) {
                }
            }
        );
    };

    var productDetailsUI = function() {
        initHijax();
    };

    return productDetailsUI;
});
