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
    'scrollTo',
    'dust!components/loading/loading'
], function($, ScrollerTemplate, Utils, Magnifik, translator, Hijax, bellows, sheet, ScrollerTmpl, reviewsUI, scrollTo, LoadingTemplate) {
    var $addToCartPinny = $('.js-added-to-cart-pinny');
    var $reviewBellow = $('.c-reviews-bellows');

    var reviewSection = function() {
        reviewsUI.addNoRatingsSection();
        reviewsUI.changeHeadingPosition();
        reviewsUI.updatePaginationButtons();
        reviewsUI.createRangeInReview();
        reviewsUI.transformSortBy();
        reviewsUI.createPaginationDropDown();
        reviewsUI.reviewPaginationDropDownChangeFunc();

    };

    // Updating reviews section on handling pagination and sort by
    var updateReviewsSection = function() {
        reviewsUI.changeHeadingPosition();
        reviewsUI.addNoRatingsSection();
        reviewsUI.updatePaginationButtons();
        reviewsUI.transformSortBy();
        reviewsUI.reviewPaginationDropDownChangeFunc();
    };


    // Handling click functionality
    var bindEvents = function() {
        $('body').on('click', '.pr-page-next, .pr-page-prev', function() {
            setTimeout(function() {
                updateReviewsSection();
                $.scrollTo($reviewBellow);
            }, 1000);
        });

        $('.c-review-page-dropdown').on('change', function() {
            var value = $(this).val();
            var $paginationWrapper = $('.pr-pagination-bottom');
            var text = $paginationWrapper.find('.pr-page-nav a').attr('onclick');
            var parts = text.split('getReviewsFromMeta(');
            var secondpart = parts[1].split(/,(.+)?/)[1];
            var newLink = parts[0] + 'getReviewsFromMeta(' + value + ',' + secondpart;
            $('.c-temp-review-pagination-anchor').attr('onclick', newLink);
            $('.c-temp-review-pagination-anchor').click();
            setTimeout(function() {
                updateReviewsSection();
                $.scrollTo($reviewBellow);
            }, 1000);
        });


        $('body').on('click', '.pr-page-prev', function() {
            setTimeout(function() {
                updateReviewsSection();
                $.scrollTo($reviewBellow);
            }, 1000);
        });

        $('body').on('change', '#pr-sort-reviews', function() {
            var $container = $('.pr-contents-wrapper');
            new LoadingTemplate(true, function(err, html) {
                $container.empty().append($(html));
            });
            setTimeout(function() {
                updateReviewsSection();
                $.scrollTo($reviewBellow);
            }, 500);
        });

        // $('body').on('click', '#videoLinkButton', function() {
        //     // Scroll to Reviews Bellows
        //     $.scrollTo($videoBellows);
        //     // Open Bellows for Video
        //     // This is required as SVG icon was not changing on call of Bellows open method
        //     if (!$videoBellows.hasClass('bellows--is-open')) {
        //         $videoBellows.find('.bellows__header').click();
        //     }
        // });

        $('body').on('click', '.c-overallRating', function() {
            var $reviewsBellows = $('.c-reviews-bellow');
            // Scroll to Reviews Bellows
            $.scrollTo($reviewBellows);
            // Open Bellows for Reviews
            // This is required as SVG icon was not changing on call of Bellows open method
            if (!$reviewsBellows.hasClass('bellows--is-open')) {
                $reviewsBellows.find('.bellows__header').click();
            }
        });
    };

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

    var initBellows = function() {
        $('.c-bellows__item').map(function(_, item) {
            var $item = $(item);
            var $icon = $item.find('.c-icon');
            $('.js-video-bellows').addClass('bellows--is-open');
            if ($item.hasClass('bellows--is-open')) {
                $icon.attr('data-fallback', 'img/png/collapse.png');
                $icon.find('title').text('collapse');
                $icon.find('use').attr('xlink:href', '#icon-collapse');
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
        initBellows();
        updateReviewsSection();
    };

    return productDetailsUI;
});
