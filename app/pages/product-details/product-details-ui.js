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
        // $('.js-product-description-bellows').bellows('open', 0);


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
            var $modal = $('#addToCartInfo');
            var $content = $('#addToCartInfoCont');
            $content.find('#continueShoppingLink').insertAfter('#viewCartLink');
            $modal.find('#addToCartInfoTitle').addClass('c-added-to-cart-msg')
                .insertBefore($content.find('#addToCartInfoMsg'));
            $modal.addClass('u-visually-hidden');
            $addToCartPinny.find('.c-sheet__title').html(translator.translate('added_to_cart'));
            $addToCartPinny.find('.js-added-to-cart-pinny__body').html($content);
            $addToCartPinny.find('.pinny__close').addClass('container-close');
            if (!$addToCartPinny.hasClass('js-rendered')) {
                $addToCartPinny.find('#addToCartInfoTitle')
                    .html($addToCartPinny.find('#addToCartInfoTitle').html().replace('Great Choice!', '<b>Great Choice!</b>'));
                $addToCartPinny.pinny('open');
            }
            $addToCartPinny.addClass('js-rendered');
            return _override;
        };

    };

    var interceptCheckAddToCart = function interceptCheckAddToCart() {
        var $addToCartButtonContainer = $('.prod_add_to_cart');

        var _override  = window.checkAddToCart;
        window.checkAddToCart = function() {
            var override = _override.apply(this, arguments);
            if ($('#addToCartButton').attr('src').indexOf('_gr.gif') >= 0) {
                $addToCartButtonContainer.addClass('c--disabled');
            } else {
                $addToCartButtonContainer.removeClass('c--disabled');
            }
            return _override;
        };
    };

    var createSwatchesSection = function() {
        var $swatchesContainer = $('.s7flyoutSwatches');
        $swatchesContainer.addClass('c-scroller');
        $swatchesContainer.find('div').first().addClass('c-scroller__content').removeAttr('style');
        $swatchesContainer.find('div').first().find('> div').last().addClass('c-slideshow').removeAttr('style');
        $swatchesContainer.find('.s7flyoutSwatch').each(function() {
            $(this).addClass('c-slideshow__slide');
            $(this).parent().addClass('c-swatches').removeAttr('style');
            $('.c-swatches').parent().removeAttr('style');
        });
    };

    var interceptSwatchCreation = function interceptSwatchCreation() {

        var _override  = window.s7js.flyout.Swatch.prototype.onLoadComplete;
        window.s7js.flyout.Swatch.prototype.onLoadComplete = function() {
            var override = _override.apply(this, arguments);
            createSwatchesSection();
            return _override;
        };
    };

    var buildYouMayAlsoLikeCarousel = function() {
        var $container = $('.js-suggested-products');
        var $parsedProducts = [];
        var $heading = $('<h2 class="c-carousel__title">').text(translator.translate('you_may_also_like'));
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
                zIndex: 1999
            },
            closed: function() {
                $('#addToCartInfo_mask').css('display', 'none');
                $addToCartPinny.removeClass('js-rendered');
            }
        });
    };

    var productDetailsUI = function() {
        buildYouMayAlsoLikeCarousel();
        reviewSection();
        bindEvents();
        initAddToCartSheet();
        interceptAddToCart();
        interceptCheckAddToCart();
        interceptSwatchCreation();
    };

    return productDetailsUI;
});
