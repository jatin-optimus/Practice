define([
    '$',
],
function($) {
    var $reviewBellow = $('.c-reviews-bellow');
    var setHeadings = function() {
        var $heading, $container;
        $container = $('#reviewsTabCon').find('.pr-review-wrap');
        if ($container === null) {
            setHeadings();
        } else {
            $container.each(function() {
                $heading = $(this).find('.pr-review-rating-headline');
                $container = $(this).find('.pr-review-rating-wrapper');
                $heading.insertBefore($container);
            });
        }
    };
    var updatePaginationButtons = function() {
        var $pagination = $('.pr-pagination-bottom');
        var $next = $pagination.find('.pr-page-next');
        var $previous = $pagination.find('.pr-page-prev');
        if ($next.find('a').length === 0) {
            $next.text('Next');
            $next.addClass('c-next-disabled');
        } else {
            $next.find('a').text('Next');
        }
        if ($previous.find('a').length === 0) {
            $previous.text('Back');
            $previous.addClass('c-prev-disabled');
        } else {
            $previous.find('a').text('Back');
        }
    };


    var addNoRatingsSection = function() {
        setTimeout(function() {
            if ($('.pr-snapshot-no-ratings') === null) {
                addNoRatingsSection();
            } else {
                $('#reviewsTabCon').append($('.pr-snapshot-no-ratings'));
            }
        }, 500);
    };

    // var getCurentPage = function(paginationWrapper) {
    //     var $paginationWrapper = paginationWrapper.find('.pr-pagination-bottom');
    //     var $prev = $paginationWrapper.find('.pr-page-prev');
    //     var $next = $paginationWrapper.find('.pr-page-next');
    //     var currentPage = 1;
    //     if ($prev.find('a').length > 0) {
    //         var text = $prev.find('a').attr('onclick');
    //         var pageNo = text.slice(text.indexOf('(') + 1, text.indexOf(','));
    //         currentPage =  parseInt(pageNo) + 1;
    //     }
    //     return currentPage;
    // };
    //
    // var createPaginationDropDown = function() {
    //     if ($('.pr-page-nav').html() === null) {
    //         return;
    //     }
    //     var totalReviewCount = $reviewBellow.find('.c-bellows__header').text();
    //     totalReviewCount = totalReviewCount.slice(totalReviewCount.indexOf('(') + 1, totalReviewCount.indexOf(')'));
    //
    //     var $paginationWrapper = $('#reviewsTabCon');
    //     var perPageCount = $paginationWrapper.find('.pr-pagination-top .pr-page-count strong').text();
    //     perPageCount = perPageCount.split('-')[1];
    //     var totalPages = Math.ceil(totalReviewCount / 30);
    //     if (totalPages === 1) {
    //         return;
    //     }
    //     var options = [];
    //     var $select = $('<select class="c-review-page-dropdown"></select>');
    //     var currentPage = getCurentPage($paginationWrapper);
    //     for (var i = 1; i <= totalPages; i++) {
    //         var text = 'Page ' + i + ' of ' + totalPages;
    //         if (currentPage === i) {
    //             $select.append('<option value="' + i + '"selected="selected">' + text + '</option>');
    //         } else {
    //             $select.append('<option value=' + i + '>' + text + '</option>');
    //         }
    //     }
    //     var $dropDownContainer = $('<div class="c-review-dropdown"></div>');
    //     $dropDownContainer.append($select);
    //     $('.pr-pagination-bottom').append($dropDownContainer);
    // };
    // var reviewPaginationDropDownChangeFunc = function() {
    //     $('.c-review-page-dropdown').on('change', function() {
    //         var value = $(this).val();
    //         var $paginationWrapper = $('.pr-pagination-bottom');
    //         var text = $paginationWrapper.find('.pr-page-nav a').attr('onclick');
    //         var parts = text.split('getReviewsFromMeta(');
    //         var secondpart = parts[1].split(/,(.+)?/)[1];
    //         var newLink = parts[0] + 'getReviewsFromMeta(' + value + ',' + secondpart;
    //         $('.c-temp-review-pagination-anchor').attr('onclick', newLink);
    //         $('.c-temp-review-pagination-anchor').click();
    //     });
    // };
    //
    // //  Get current page
    // var getCurentPage = function getCurentPage(paginationWrapper) {
    //     var $paginationWrapper = paginationWrapper.find('.pr-pagination-bottom');
    //     var $prev = $paginationWrapper.find('.pr-page-prev');
    //     var $next = $paginationWrapper.find('.pr-page-next');
    //     var currentPage = 1;
    //     if ($prev.find('a').html() !== null) {
    //         var text = $prev.find('a').attr('onclick');
    //         var pageNo = text.slice(text.indexOf('(') + 1, text.indexOf(','));
    //         currentPage =  parseInt(pageNo) + 1;
    //     }
    //     return currentPage;
    // };
    //
    // // Creates pagination dropdown
    // var createPaginationDropDown = function createPaginationDropDown() {
    //     if ($('.pr-page-nav').html() === null) {
    //         return;
    //     }
    //
    //     var $bellows = $('.c-pdp-tabs');
    //     var totalReviewCount = $bellows.find('.bellows__item:nth-child(3) .x-bellowsText').text();
    //     totalReviewCount = totalReviewCount.slice(totalReviewCount.indexOf('(') + 1, totalReviewCount.indexOf(')'));
    //
    //     var $paginationWrapper = $('#reviewsTabCon');
    //     var perPageCount = $paginationWrapper.find('.pr-pagination-top .pr-page-count strong').text();
    //     perPageCount = perPageCount.split('-')[1];
    //
    //     // TODO: TBD - Why is this 30 hardcoded? This should be picked from desktop rather than hardcoded
    //     var totalPages = Math.ceil(totalReviewCount / 30);
    //     var options = [];
    //
    //     // TODO: Html structures should not be created in JS but from dust
    //     var $select = $('<select class="c-review-page-dropdown"></select>');
    //
    //     var currentPage = getCurentPage($paginationWrapper);
    //     for (var i = 1; i <= totalPages; i++) {
    //
    //         var text = 'Page ' + i + ' of ' + totalPages;
    //         if (currentPage === i) {
    //             $select.append('<option value="' + i + '"selected="selected">' + text + '</option>');
    //         } else {
    //             $select.append('<option value=' + i + '>' + text + '</option>');
    //         }
    //     }
    //     var $dropDownContainer = $('<div class="c-review-dropdown"></div>');
    //     $dropDownContainer.append($select);
    //     $('.pr-pagination-bottom').append($dropDownContainer);
    // };


    // / Get current page
    var getCurentPage = function getCurentPage(paginationWrapper) {
        var $paginationWrapper = paginationWrapper.find('.pr-pagination-bottom');
        var $prev = $paginationWrapper.find('.pr-page-prev');
        var $next = $paginationWrapper.find('.pr-page-next');
        var currentPage = 1;
        if ($prev.find('a').html() !== null) {
            var text = $prev.find('a').attr('onclick');
            var pageNo = text.slice(text.indexOf('(') + 1, text.indexOf(','));
            currentPage =  parseInt(pageNo) + 1;
        }
        return currentPage;
    };

    // Creates pagination dropdown
    var createPaginationDropDown = function createPaginationDropDown() {
        if ($('.pr-page-nav').html() === null) {
            return;
        }

        var $bellows = $('.c-pdp-tabs');
        var totalReviewCount = $bellows.find('.bellows__item:nth-child(3) .x-bellowsText').text();
        totalReviewCount = totalReviewCount.slice(totalReviewCount.indexOf('(') + 1, totalReviewCount.indexOf(')'));

        var $paginationWrapper = $('#reviewsTabCon');
        var perPageCount = $paginationWrapper.find('.pr-pagination-top .pr-page-count strong').text();
        perPageCount = perPageCount.split('-')[1];

        // TODO: TBD - Why is this 30 hardcoded? This should be picked from desktop rather than hardcoded
        var totalPages = Math.ceil(totalReviewCount / 30);
        var options = [];

        // TODO: Html structures should not be created in JS but from dust
        var $select = $('<select class="c-review-page-dropdown"></select>');

        var currentPage = getCurentPage($paginationWrapper);
        for (var i = 1; i <= totalPages; i++) {

            var text = 'Page ' + i + ' of ' + totalPages;
            if (currentPage === i) {
                $select.append('<option value="' + i + '"selected="selected">' + text + '</option>');
            } else {
                $select.append('<option value=' + i + '>' + text + '</option>');
            }
        }
        var $dropDownContainer = $('<div class="c-review-dropdown"></div>');
        $dropDownContainer.append($select);
        $('.pr-pagination-bottom').append($dropDownContainer);
    };

    return {
        setHeadings: setHeadings,
        updatePaginationButtons: updatePaginationButtons,
        createPaginationDropDown: createPaginationDropDown,
        getCurentPage: getCurentPage,
        reviewPaginationDropDownChangeFunc: reviewPaginationDropDownChangeFunc,
        addNoRatingsSection: addNoRatingsSection
    };
});
