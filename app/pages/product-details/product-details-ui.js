define([
    '$',
    'hijax',
    'dust!components/scroller/scroller'
], function($, Hijax, ScrollerTemplate) {
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
    var buildYouMayAlsoLikeCarousel = function() {
        var $container = $('.js-suggested-products');
        var $parsedProducts = [];
        var $heading = $('<h2 class="c-title c--small u-margin-bottom-md">').text('You Might Also Like');
        var productTileData = [];
        setTimeout(function() {
            if ($('#PRODPG1_cm_zone').children().length === 0) {
                buildYouMayAlsoLikeCarousel();
            } else {
                var $items = $('.pdetailsSuggestionsCon');
                var $titles = $items.find('strong').each(function() {
                    var $this = $(this);
                });
                $items.map(function(_, item) {
                    var $item = $(item);
                    var $content = {
                        slideContent :$item
                    };
                    $parsedProducts.push($content);
                });
                var scrollerData = {
                    slideshow: {
                        slides: $parsedProducts
                    }
                };

                new ScrollerTemplate(scrollerData, function(err, html) {
                    $container.empty().html(html);
                });

                $container.prepend($heading);
            }
        }, 500);
        $('#pdetails_suggestions').addClass('u-visually-hidden');
    };

    var productDetailsUI = function() {
        initHijax();
        buildYouMayAlsoLikeCarousel();
    };

    return productDetailsUI;
});
