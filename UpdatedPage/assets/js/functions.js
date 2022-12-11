var workSectionPos = $('section.work').offset().top;
var eduSectionPos = $('section.education').offset().top;
var skillsSectionPos = $('section.skills').offset().top;
var hobbiesSectionPos = $('section.hobbies').offset().top;
var footerSectionPos = $('footer.home-footer').offset().top;

$(function(){
    smoothScroll(300);
    mobileNav();
    projectNav();
    
    setInterval(function(){
        var wScroll = $(window).scrollTop();
        if(wScroll > hobbiesSectionPos - $(window).height() && wScroll < footerSectionPos){
            hobbyTada();
        }
        
    }, 4000);

    setInterval(function(){
        var wScroll = $(window).scrollTop();
        if(wScroll > hobbiesSectionPos - $(window).height() && wScroll < footerSectionPos){
            imageRotate();
        }

    }, 5000);
    
    designBGStuff();
});

function smoothScroll (duration) {
	$('a[href^="#"]').on('click', function(event) {

	    var target = $( $(this).attr('href') );

	    if( target.length ) {
	        event.preventDefault();
	        $('html, body').animate({
	            scrollTop: target.offset().top
	        }, duration);
	    }
	});
}

function mobileNav() {
    $('.mobile-nav-toggle').on('click', function(){
      $('.mobile-nav-toggle, .mobile-nav').toggleClass('is-open');
    });
}

// Project panel switch based on project selection in Work section
function projectNav() {

    $('.proj-Btn').on('click', function(){
        var $this = $(this);

        $this.siblings().removeClass('optum-selected')
            .removeClass('bayer-selected')
            .removeClass('default-selected');
        
        
        // Set accent color as per company theme color
        var btnText = $this.text();
        if(btnText.includes("Optum")){
            $this.addClass('optum-selected');
            
            $('.highlighter').css('background', '#E87722');
        }
        else if(btnText.includes("Bayer")){
            $this.addClass('bayer-selected');
            
            $('.highlighter').css('background', '#01BEFF');
        }
        else{
            $this.addClass('default-selected');          
            $('.highlighter').css('background', '#64ffda');
        }
        
        // Find the corresponding job description panel for the respective button
        var target = '#' + $this.data('panel');

        $(target).css({
            "visibility": "visible",
            "opacity": "1"
        })
        .siblings('.projPanel').css({
            "visibility": "hidden",
            "opacity": "0"
        });


        // Left border highlight on the button/tab selected
        $('.highlighter').css('transform', 'translateY(calc(' + $this.index() + ' * 42px))');
    });
}

function designBGStuff(){
    $('.design-img-link').hover(function(){
        $(this).parent().parent().parent().css('background-color', $(this).data('color'));
    }, function(){
        $(this).parent().parent().parent().css('background-color', $(this).parent().parent().parent().data('orig-color'));
    });
}

function hobbyTada(){
    var randNum = Math.floor(Math.random() * $('.hobby-thumb').length)
    $('.hobby-thumb').eq(randNum).addClass('is-emph')
        .siblings().removeClass('is-emph');
}

function imageRotate(){

    var randomPic = Math.floor(Math.random() * thumbnailData.length);
    var randThumbElement = Math.floor(Math.random() * $('.hobby-thumb').length);

    $('.hobby-thumb').eq(randThumbElement).css('background-image', 'url(' + thumbnailData[randomPic]["path"] + ')')
                                        .attr('href', thumbnailData[randomPic]["path"]);
    
    // Changes the meta (name and description) for the thumbnail
    var thumbnailCover = $('.hobby-thumb').eq(randThumbElement).children().eq(0);
    thumbnailCover.children('.name').text(thumbnailData[randomPic]["title"]);
    thumbnailCover.children('.thumb-desc').text(thumbnailData[randomPic]["desc"]);

}

// Functions to be called when scrolled
$(window).scroll(function(){
    coursesScroll();
    startHobbies();
    menuThemeChange();
});

function coursesScroll(){
    var wScroll = $(window).scrollTop();
    var triggerPoint = eduSectionPos - $(window).height();

    if(triggerPoint < wScroll){
        $('.courses-1').css('margin-top', '-' + (wScroll - triggerPoint) +'px');
        $('.courses-2').css('margin-top', '-' +(wScroll - triggerPoint) +'px');

        $('.video-strip').css('background-position','center -'+ wScroll +'px');
    }
}


function startHobbies(){
    var wScroll = $(window).scrollTop();

    if($('section.hobbies').offset().top - $(window).height()/2 < wScroll){
        $('.hobbies-wrap').children().each(function(i){
            setTimeout(function(){
                $('.hobbies-wrap').children().eq(i).addClass('is-visible');
            }, 200 * i);
        });
    }
}

function menuThemeChange(){
    var wScroll = $(window).scrollTop();
    var menuColorScheme = '';

    if(wScroll >= workSectionPos - 50 && wScroll < eduSectionPos - 50){
        menuColorScheme = 'work-scheme';
    }
    else if(wScroll >= eduSectionPos - 50 && wScroll < skillsSectionPos - 50){
        menuColorScheme = 'edu-scheme';
    }
    else if(wScroll >= skillsSectionPos - 50 && wScroll < hobbiesSectionPos - 50){
        menuColorScheme = 'skills-scheme';
    }
    else if(wScroll >= hobbiesSectionPos - 50){
        menuColorScheme = 'hobbies-scheme';
    }

    $('.site-nav a').each(function(i){
        if($(this).hasClass('resume')){
            // Removes all classes except resume class from the resume item
            $(this).removeClass()
                .addClass('resume');
        }
        else{
            $(this).removeClass();
        }
        
        // Except for about section (menuColor will be empty/default), color scheme will be set
        if(menuColorScheme != ''){
            $(this).addClass(menuColorScheme);
        }
    });
}