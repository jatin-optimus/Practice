define([
    '$',
    'dust!components/scroller/scroller',
    'global/utils',
    'magnifik',
    'translator',
    'hijax',
    'bellows',
    'components/sheet/sheet-ui',
    'dust!components/scroller/scroller',
    'pages/product-details/ui/reviews-ui',
    'scrollTo'
], function($, ScrollerTemplate, Utils, Magnifik, translator, Hijax, bellows, sheet, ScrollerTmpl, reviewsUI, scrollTo) {
    var $addToCartPinny = $('.js-added-to-cart-pinny');
    var $wishlistShade = $('.js-wishlist-shade');

    var reviewSection = function() {
        reviewsUI.addNoRatingsSection();
        reviewsUI.setHeadings();
        reviewsUI.updatePaginationButtons();
    };

    var bindEvents = function() {
        $('body').on('click', '.pr-page-next', function() {
            setTimeout(function() {
                reviewsUI.addNoRatingsSection();
                reviewsUI.setHeadings();
                reviewsUI.updatePaginationButtons();
            }, 1000);
        });
        $('body').on('click', '.pr-page-prev', function() {
            setTimeout(function() {
                reviewsUI.addNoRatingsSection();
                reviewsUI.setHeadings();
                reviewsUI.updatePaginationButtons();
            }, 1000);
        });
        $('body').on('change', '#pr-sort-reviews', function() {
            setTimeout(function() {
                reviewsUI.addNoRatingsSection();
                reviewsUI.setHeadings();
                reviewsUI.updatePaginationButtons();
            }, 1000);
        });
        $('body').on('click', '.pr-snippet-stars', function() {
            var $reviewsBellows = $('.js-reviews-bellows');
            // Scroll to Reviews Bellows
            $.scrollTo($reviewsBellows);
            // Open Bellows for Reviews and Rating
            if (!$reviewsBellows.hasClass('bellows--is-open')) {
                $reviewsBellows.find('.bellows__header').click();
            }
        });
        $('body').on('click', '#videoLinkButton', function() {
            var $videoBellows = $('.js-video-bellows');
            // Scroll to Reviews Bellows
            $.scrollTo($videoBellows);
            // Open Bellows for Reviews and Rating
            if (!$videoBellows.hasClass('bellows--is-open')) {
                $videoBellows.find('.bellows__header').click();
            }
        });
        $('body').on('click', '#continueShoppingLink', function() {
            var $closeButton = $addToCartPinny.find('.pinny__close');
            $closeButton.click();
        });

        // Opening the video bellow by default to match mock.
        $('.js-product-description-bellows').bellows('open', 0);


    };

    var initBellows = function() {
        $('.c-bellows__item').map(function(_, item) {
            var $item = $(item);
            var $icon = $item.find('.c-icon');
            if ($item.hasClass('bellows--is-open')) {
                $icon.attr('data-fallback', 'img/png/collapse.png');
                $icon.find('title').text('collapse');
                $icon.find('use').attr('xlink:href', '#icon-collapse');
            }
        });
    };
    
    // SetTimeout is used because the video bello has been opened
    // just as the pageload and was takibg some time to chage the icon and holding it.

    setTimeout(initBellows, 500);

    var interceptAddToCart = function interceptAddToCart() {

        var _override  = window.updateShoppingCartSummary;
        window.updateShoppingCartSummary = function() {
            var override = _override.apply(this, arguments);
            if ($('#addToCartButton').attr('src').indexOf('_gr.gif') >= 0) {
                $('.prod_add_to_cart').addClass('c--disabled');
            }
            var $modal = $('#addToCartInfo');
            var $content = $('#addToCartInfoCont');
            $content.find('#continueShoppingLink').insertAfter('#viewCartLink');
            $modal.addClass('u-visually-hidden');
            $addToCartPinny.find('.c-sheet__title').html('Added to Cart');
            $addToCartPinny.find('.js-added-to-cart-pinny__body').html($content);
            $addToCartPinny.find('.pinny__close').addClass('container-close');
            if (!$('.js-added-to-cart-pinny').hasClass('js-rendered')) {
                $addToCartPinny.pinny('open');
            }
            $('.js-added-to-cart-pinny').addClass('js-rendered');
            return _override;
        };

    };

    var interceptCheckAddToCart = function interceptCheckAddToCart() {

        var _override  = window.checkAddToCart;
        window.checkAddToCart = function() {
            var override = _override.apply(this, arguments);
            if ($('#addToCartButton').attr('src').indexOf('_gr.gif') >= 0) {
                $('.prod_add_to_cart').addClass('c--disabled');
            } else {
                $('.prod_add_to_cart').removeClass('c--disabled');
            }
            return _override;
        };
    };

    var buildYouMayAlsoLikeCarousel = function() {
        var $container = $('.js-suggested-products');
        var $parsedProducts = [];
        var $heading = $('<h2 class="c-carousel__title">').text('You Might Also Like');
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

    var initAddToCartSheet = function() {
        sheet.init($addToCartPinny, {
            zIndex: 2000,
            shade: {
                zIndex: 1999,
                cssClass: 'js-wishlist-shade'
            },
            closed: function() {
                $('#addToCartInfo_mask').css('display', 'none');
                $('.js-added-to-cart-pinny').removeClass('js-rendered');
            }
        });
    };

    // var initBellows = function() {
    //     debugger;
    //     var $changeBellowIconItem = $('.js-product-description-bellows').find('.js-video-bellows');
    //     var $icon = $changeBellowIconItem.find('.c-icon');
    //     if ($changeBellowIconItem.hasClass('bellows--is-open')) {
    //         $icon.attr('data-fallback', 'img/png/collapse.png');
    //         $icon.find('title').text('collapse');
    //         $icon.find('use').attr('xlink:href', '#icon-collapse');
    //     }
    // };



    var productDetailsUI = function() {
        buildYouMayAlsoLikeCarousel();
        reviewSection();
        bindEvents();

        initAddToCartSheet();
        interceptAddToCart();
        interceptCheckAddToCart();
    };

    return productDetailsUI;
});
