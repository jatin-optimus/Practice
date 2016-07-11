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
                label: 'aaa',
                swatches: $item.find('.prodSelectRefCon')
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
                var $productDetailForm = $('#addToCartForm');
                return {
                    form: $productDetailForm,
                    hiddenfields: $productDetailForm.find('[type="hidden"]'),
                    swatchesContainer: getProductSwatches($productDetailForm)
                };
            }
        }

        /**
         * If you wish to override preProcess/postProcess in this view, have a look at the documentation:
         * http://adaptivejs.mobify.com/v1.0/docs/views
         */
    };
});
