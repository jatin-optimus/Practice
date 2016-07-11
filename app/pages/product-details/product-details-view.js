define([
    '$',
    'global/baseView',
    'dust!pages/product-details/product-details'

],
function($, BaseView, template) {

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
            }
        }

        /**
         * If you wish to override preProcess/postProcess in this view, have a look at the documentation:
         * http://adaptivejs.mobify.com/v1.0/docs/views
         */
    };
});
