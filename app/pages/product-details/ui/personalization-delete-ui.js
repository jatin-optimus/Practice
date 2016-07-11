define([
    '$',
    'components/sheet/sheet-ui',
    'translator',
    'global/utils',
    'global/utils/dom-operation-override'
], function($, sheet, translator, Utils, DomOverride) {


    var $removePersonalizationPinny = $('.js-delete-personalization-pinny');

    var $registryConfirmationPinny = $('.js-registry-confirmation-pinny');
    var $registryConfirmationModalShade;

    var _showRemovalConfirmationModal = function($removePersonalizationModal) {
        var title = $removePersonalizationModal.find('.Caption').text();
        var $content = $removePersonalizationModal.find('.dialogContent');
        var $cancelButton = $content.find('.button.secondary').addClass('c-button  c--secondary c--outline pinny__close js-cancel-button').append(' >');
        $content.find('.button.primary')
            .addClass('c-button c--primary c--full-width js-ok-button  js-yes-button pinny__close').append(' >')
            .after($cancelButton);
        $cancelButton.addClass('c--full-width c-cancel-button js-close-modal');
        $content.find('.button.primary').addClass('c-button c--primary c--full-width js-yes-button pinny__close');
        $removePersonalizationPinny.find('.c-sheet__title').text('Confirmation');
        $removePersonalizationPinny.find('.js-delete-personalization-pinny__body').html($content);
        $removePersonalizationPinny.pinny('open');
    };


    var _onSheetClose = function() {
        var $lockup = $('.lockup__container');
        // Remove the loader and revert back to the original btn text.

        if ($removePersonalizationPinny.hasClass('js--forgot-pw')) {
            $removePersonalizationPinny.removeClass('js--forgot-pw');
            // Click cancel button
            $removePersonalizationPinny.find('button').click();
            // Reset pinny markup.
            $removePersonalizationPinny.parent().appendTo($lockup);
            $('.js-remove-personalization-shade').appendTo($lockup);
        }

        $(document).trigger('pinny.confirmationModal.close');
    };

    var _modalRemovedCallback = function(modal) {
        var $lockup = $('.lockup__container');
        $registryConfirmationPinny.parent().appendTo($lockup);
        $registryConfirmationModalShade.appendTo($lockup);

        $registryConfirmationPinny.pinny('close');
    };

    var _bindPinnyEvents = function() {
        DomOverride.on('domRemove', '.ok-cancel-dlog', _modalRemovedCallback);

        $('body').on('click', '.js-registry-confirmation-pinny .pinny__close', function(e) {
            $('.js-registry-confirmation-pinny').find('.ok-cancel-close-btn')[0].dispatchEvent(new CustomEvent('click'));
        });
    };

    var _showRegistryConfirmationModal = function($registryConfirmationModal) {
        var title = $registryConfirmationModal.find('.Caption').text();
        var $content = $registryConfirmationModal.find('.dialogContent');
        var $closeButton = $registryConfirmationModal.find('.dialogTopCenterInner').addClass('u--hide');
        var $cancelButton = $content.find('.button.secondary').append(' >');
        $content.find('.button.primary')
            .addClass('c-button c--secondary c--outline c--full-width u--bold u-text-lowercase ').append(' >');
        $cancelButton.addClass('c--full-width c-button u-margin-top-md c--primary');

        $content.find('.addToCartProductName').addClass('u--bold u-margin-bottom-md');
        $content.find('.gwt_addtocartdiv_itemlabel, .ois-option-name, .gwt_addtocartdiv_quanitylabel, .gwt_addtocartdiv_pricelabel').addClass('c-product-specification-label u--bold u-text-align-start');
        $content.find('.gwt_addtocartdiv_shipping_message').addClass('u-text-align-start  u-margin-top-md u-margin-bottom-md');
        $content.find('.gwt_quantity_div').addClass('u-clear-both');
        $content.find('.gwt_addtocartdiv_waspricediv, .gwt_addtocartdiv_nowpricediv').addClass('u--flex');
        $content.find('.gwt_addtocartdiv_itemnumber, .gwt_addtocartdiv_quanity, .gwt_addtocartdiv_price').addClass('u-text-align-start');
        $content.find('.gwt_addtocartdiv_quanity').addClass('u--show');
        $content.find('.ois-option-colon').remove();
        $content.find('.ois-option-name, .gwt_addtocartdiv_itemlabel').append(':');
        $content.find('.moreContentExpander').find('style').remove();


        $registryConfirmationPinny.find('.c-sheet__title').text('Confirmation');
        $registryConfirmationPinny.find('.js-registry-confirmation-pinny__body').html($content.add($closeButton));

        $registryConfirmationPinny.find('table td').addClass('u-no-border-bottom');
        $registryConfirmationPinny.find('table').addClass('u-margin-top-0 u-margin-bottom-0');
        $registryConfirmationPinny.find('.gwt-gift-registry-message').addClass('u-text-align-start');
        $registryConfirmationPinny.find('.okCancelPanel').closest('tr').nextAll().addClass('c-not-required-fields').remove();
        $registryConfirmationModal.html($registryConfirmationPinny.parent());
        $registryConfirmationModal.append($registryConfirmationModalShade);
        $registryConfirmationPinny.pinny('open');
    };

    var _initSheet = function() {
        // zIndex values are set to ensure they appear above bundle Pinny
        sheet.init($removePersonalizationPinny, {
            zIndex: 2000,
            shade: {
                zIndex: 1999,
                cssClass: 'js-remove-personalization-shade'
            },
            close: _onSheetClose,

            open: function() {
                // if ($('.js-delete-personalization-pinny').length) {
                // }
                $('.js-to-top').addClass('c--in-active');
            },
            closed: function() {
                $('.js-to-top').removeClass('c--in-active');
            }

        });

        sheet.init($registryConfirmationPinny, {
            zIndex: 2000,
            shade: {
                zIndex: 1999,
                cssClass: 'js-registry-confirmation-shade'
            },
            open: function() {
                $('.js-to-top').addClass('c--in-active');
            },
            closed: function() {
                $('.js-to-top').removeClass('c--in-active');
            }
        });

        $registryConfirmationModalShade = $('.js-registry-confirmation-shade');

        _bindPinnyEvents();
    };

    return {
        initSheet: _initSheet,
        showRemovalConfirmationModal: _showRemovalConfirmationModal,
        showRegistryConfirmationModal: _showRegistryConfirmationModal
    };
});
