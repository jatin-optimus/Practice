define(['$'], function($) {

    var parse = function() {
        var $login = $('#login');
        var $myAccount = $('#myAccount');
        var $giftregistry = $('#giftregistry');
        var $orderStatus = $('#orderStatus');
        var $wishlist = $('#wishlist');
        var $recommendations = $('#recommentations');
        var myAccountLinks = [];

        $login.length && myAccountLinks.push($login);
        $myAccount.length && myAccountLinks.push($myAccount);
        $giftregistry.length && myAccountLinks.push($giftregistry);
        $wishlist.length && myAccountLinks.push($wishlist);
        $orderStatus.length && myAccountLinks.push($orderStatus);
        $recommendations.length && myAccountLinks.push($recommendations);

        return {
            myAccountLinks: myAccountLinks
        };
    };

    return {
        parse: parse
    };
});
