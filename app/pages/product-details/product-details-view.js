define([
    '$',
    'global/baseView',
    'dust!pages/product-details/product-details'
],
function($, BaseView, template) {


    var getProductSwatches = function($container) {
        return $container.find('.prod_select_con').map(function(_, item) {
            var $item = $(item);
            $item.find('.mSizeChart').find('a').text('Size Chart');
            $item.find('.prod_select_title, .prod_select_title2').wrapAll('<div class="c-swatches-heading" />');
            $item.find('.fit_tip').first().parent().addClass('c-fit-tip');
            return {
                label: $(item).find('.prodSelectRefCon2').find('.c-swatches-heading'),
                swatches: $item.find('.prodSelectRefCon:not(.prodSelectRefCon2)')
            };
        });
    };

    var getProductDescriptonTabs = function() {
        var _items = [];
        _items.push({
            bellowsItemClass: 'js-video-bellows',
            sectionTitle: $('#grp_3Tab').text(),
            content: $('#grp_3').addClass('c-video-tab')
        });
        _items.push({
            sectionTitle: $('#grp_1Tab').text(),
            content: $('#grp_1')
        });
        _items.push({
            bellowsItemClass: 'js-reviews-bellows',
            sectionTitle: $('#grp_2Tab').text(),
            content: $('#grp_2'),
        });
        _items.push({
            sectionTitle: $('#grp_4Tab').text(),
            content: $('#grp_4')
        });

        var _bellows = {
            class: 'js-product-descriotion-bellows',
            items: _items
        };

        return {
            bellows: _bellows
        };

    };

    return {
        template: template,
        extend: BaseView,

        context: {
            templateName: 'product-details',
            title: function() {
                var $title = $('.prodOverview1').find('.prod_title > h1');
                $title.find('span').removeAttr('style');
                return $title;
            },
            productId: function() {
                return $('.prod_itemid').text();
            },
            priceSection: function() {
                return $('.prodOverview1').find('.prod_select_title3');
            },
            productDescriptionTabs: function() {
                return getProductDescriptonTabs();
            },
            shopRunner: function() {
                var $shopRunnerSection = $('#srd_pd');
                return $shopRunnerSection;
            },
            steps: function() {
                var $form = $('#addToCartForm');
                $form.find('#addToCartLink').append('add to cart');
                return {
                    form: $form,
                    hiddenData: $form.find('#addToCartAttributes'),
                    swatchesContainer: getProductSwatches($form),
                    addToCart: $form.find('.addToCartCon')
                };
            },
            imageSection: function() {
                var $imageSection = $('#scene7DHTMLViewerFlyout').parent();
                $imageSection.find('br').remove();
                $imageSection.find('.prod_shoe_type')
                    .addClass('c-tool-tip')
                    .html($imageSection.find('.prod_shoe_type').html().replace(/[a-zA-Z\' ]/g, ''));
                return $imageSection;
            },
            price: function() {
                return $('#ref2QIPriceTitleS');
            },
            addToCartDiv: function() {
                return $('#addToCartInfo');
            },
            cartSummary: function() {
                return $('#shoppingCartSummaryNew');
            },
            youMayLikeCarousel: function() {
                return $('#pdetails_suggestions');
            },
            overallRating: function() {
                var $rating = $('.pr-snippet');
                $rating.find('.pr-snippet-link').text('Read reviews');
                $rating.find('.pr-snippet-write-review').addClass('u-visually-hidden');
                return $rating;
            }
        }

        /**
         * If you wish to override preProcess/postProcess in this view, have a look at the documentation:
         * http://adaptivejs.mobify.com/v1.0/docs/views
         */
    };
});
