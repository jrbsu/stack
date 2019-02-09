/*jslint browser: true*/
/*global $, jQuery, alert*/

$(document).ready(function () {
    "use strict";
    
    $('#name-entry').focus();
    
    var newName = "",
        ordinal = 0,
        ordinalCount = 0,
        balanceColours = function () {
            $('.speaker-box').filter(":even").addClass('alternate');
            $('.speaker-box').filter(":odd").removeClass('alternate');
            $('.speaker-box').filter(":first-child").css("background-color", "#0F0");
            if ($('.next-text').length === 0) {
                $('.speaker-box:nth-child(1) p').prepend('<span class="next-text">Now:&nbsp;');
            }
        },
        addName = function () {
            newName = $('#name-entry').val();
            ordinal = $('.speaker-box').length + 1;
            
            $('.instructions').remove();
            
            if (newName.length !== 0) { // If it's zero, there's a problem
                if (ordinal !== 1) {
                    $('.speaker-box-container').append("<div class='speaker-box'><p><span class='ordinal'>" + ordinal + ":&nbsp;</span>" + newName + "</p></div>");
                } else {
                    $('.speaker-box-container').append("<div class='speaker-box'><p>" + newName + "</p></div>");
                }
                $('#name-entry').val("");
                $('#name-entry').focus();
                balanceColours();
            }
        },
        balanceNumbers = function () {
            $('.next .ordinal').remove();
            ordinalCount = $('.speaker-box .ordinal').length+2;
            $('.speaker-box .ordinal').each(function(index) {
                $(this).text(index+2 + ": ");
            });
        },
        nextSpeaker = function () {
            $('.speaker-box:nth-child(1)').remove();
            $('.speaker-box:nth-child(1)').addClass('next');
            balanceColours();
            addName();
            balanceNumbers();
            $('#name-entry').focus();
        };
    
    $('#submit-name').click(function () {
        addName();
        balanceNumbers();
    });
    
    $('#name-entry').on("keypress", function (e) {
        if (e.keyCode === 13) {
            addName();
            balanceNumbers();
        }
    });
    
    $('#next-speaker').click(function () {
        nextSpeaker();
    });
    
    $('.speaker-box-container').on("click", '.speaker-box', function () {
        $(this).remove();
        $('.speaker-box:nth-child(1)').addClass('next');
        balanceColours();
        balanceNumbers();
        $('#name-entry').focus();
    });
});