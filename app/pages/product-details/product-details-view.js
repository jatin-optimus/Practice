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

    var getProductDescriptonTabs = function() {
        var _items = [];
        _items.push({
            sectionTitle: $('#grp_3Tab').text(),
            content: $('#grp_3')
        });
        _items.push({
            sectionTitle: $('#grp_1Tab').text(),
            content: $('#grp_1')
        });
        _items.push({
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
                return $('.prodOverview1').find('.prod_title > h1').text();
            },
            productId: function() {
                return $('.prod_itemid').text();
            },
            productDescriptionTabs: function() {
                return getProductDescriptonTabs();
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
