define([
    '$',
    'global/baseView',
    'dust!pages/product-details/product-details'
],
function($, BaseView, template) {
    var getProductSwatches = function($container) {
        return $container.find('.prod_select_con').map(function(_, item) {
            var $item = $(item);
            return {
                // hidden: $item.find('.prodSelectRefCon2'),
                swatches: $item
            };
        });
    };

    return {
        template: template,
        extend: BaseView,

        context: {
            templateName: 'product-details',
            title: function() {
                return $('.prodOverview1').find('.prod_title > h1').text();
            },
            productId: function() {
                return $('.prod_itemid').text();
            },
            steps: function() {
                // return $('.prodRightCon');
                var $form = $('#addToCartForm');
                return {
                    form: $form,
                    hiddenData: $form.find('#addToCartAttributes'),
                    swatchesContainer: getProductSwatches($form),
                    selectTag: $('#productSelectTag'),
                    addToCart: $('.addToCartCon')
                };
            },
            hiddenContainer: function() {
                return $('.prodOverview1, .prodOverview2');
            },
            imageSection: function() {
                return $('#productDisplaySkuImage').parent();
            },
            price: function() {
                return $('#ref2QIPriceTitleS');
            }
        }

        /**
         * If you wish to override preProcess/postProcess in this view, have a look at the documentation:
         * http://adaptivejs.mobify.com/v1.0/docs/views
         */
    };
});
