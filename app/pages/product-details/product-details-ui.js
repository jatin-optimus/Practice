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
    var $videoBellows = $('.js-video-bellows');

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
        // reviewsUI.createPaginationDropDown();
        // reviewsUI.reviewPaginationDropDownChangeFunc();
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

        $('.c-review-page-dropdown').on('change', function() {
            reviewsUI.reviewPaginationDropDownChangeFunc();
            setTimeout(function() {
                $.scrollTo($reviewBellow);
            }, 1000);
        });

        $('body').on('click', '#videoLinkButton', function() {
            // Scroll to Reviews Bellows
            $.scrollTo($videoBellows);
            // Open Bellows for Video
            // This is required as SVG icon was not changing on call of Bellows open method
            if (!$videoBellows.hasClass('bellows--is-open')) {
                $videoBellows.find('.bellows__header').click();
            }
        });


        $('.c-review-page-dropdown').on('change', function() {
            reviewsUI.reviewPaginationDropDownChangeFunc();
            setTimeout(function() {
                $.scrollTo($reviewBellow);
            }, 1000);
        });

        $('body').on('click', '.c-overallRating', function() {
            var $reviewsBellows = $('.c-reviews-bellow');
            // Scroll to Reviews Bellows
            $.scrollTo($reviewBellow);
            $reviewBellow.addClass('bellows--is-open');
            var $icon = $reviewBellow.find('.c-icon');
            if ($reviewBellow.hasClass('bellows--is-open')) {
                $icon.attr('data-fallback', 'img/png/collapse.png');
                $icon.find('title').text('collapse');
                $icon.find('use').attr('xlink:href', '#icon-collapse');
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

    var centerZoomImg = function() {
        var $zoomImg = $('.js-magnifik-image');
        var loaded = function() {
            var width = $('.c-magnifik').prop('offsetWidth') / 2;
            $('.c-loading').hide();
            $zoomImg.fadeIn();
            $('.c-magnifik').prop('scrollLeft', width);
        };

        if ($zoomImg[0].complete) {
            loaded();
        } else {
            $zoomImg[0].addEventListener('load', loaded);
        }
    };

    var magnifikPinny = function() {
        var $magnificPinnyEl = $('.js-magnifik');
        var magnificPinny = sheet.init($magnificPinnyEl, {
            shade: {
                opacity: 0.95,
                color: '#fff',
                zIndex: 2
            },
            open: function() {
                var imgSrc = $('.s7flyoutFlyoutView img').attr('src');
                $('.js-magnifik-image').attr('src', imgSrc);
                $('.js-magnifik-image').hide();
                $('.c-loading').show();
            },
            opened: function() {
                centerZoomImg();
            }
        });

        $('body').on('click', '.c-zoom-icon', function(e) {
            magnificPinny.open();
        });
    };

    var productDetailsUI = function() {
        bindEvents();
        buildYouMayAlsoLikeCarousel();
        reviewSection();
        initAddToCartSheet();
        interceptAddToCart();
        interceptCheckAddToCart();
        interceptSwatchCreation();
        initBellows();
        updateReviewsSection();
        setTimeout(magnifikPinny, 500);
    };
    return productDetailsUI;
});
