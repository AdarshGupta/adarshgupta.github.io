$(function(){
    smoothScroll(300);
    mobileNav();
    projectNav();
    setInterval(function(){hobbyTada()}, 4000);
    setInterval(function(){imageRotate()}, 5000);
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

        $this.addClass('selected')
            .siblings().removeClass('selected');
        
        
        // Set accent color as per company theme color
        var btnText = $('.selected').text();
        if(btnText.includes("Optum")){
            $('.selected').css('color', '#E87722')
                .siblings().css('color', '#8892b0'); // default color
            
            $('.highlighter').css('background', '#E87722');
        }
        else if(btnText.includes("Bayer")){
            $('.selected').css('color', '#01BEFF')
                .siblings().css('color', '#8892b0'); // default color
            
            $('.highlighter').css('background', '#01BEFF');
        }
        else{
            $('.selected').css('color', '#64ffda')
                .siblings().css('color', '#8892b0'); // default color
            
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
                                        .attr('href', thumbnailData[randomPic]["link"]);
    
    var thumbnailCover = $('.hobby-thumb').eq(randThumbElement).children().eq(0);
    thumbnailCover.children('.name').text(thumbnailData[randomPic]["title"]);
    thumbnailCover.children('.thumb-desc').text(thumbnailData[randomPic]["desc"]);

}


$(window).scroll(function(){
    coursesScroll();
    startHobbies();
});

function coursesScroll(){
    var wScroll = $(window).scrollTop();
    var eduSectionPos = $('section.education').offset().top;
    var triggerPoint = eduSectionPos - $(window).height()

    if(triggerPoint < wScroll){
        $('.courses-1').css('margin-top', '-' + (wScroll - triggerPoint) +'px');
        $('.courses-2').css('margin-top', '-' + (wScroll - triggerPoint) +'px');
        // $('.courses-1').css('margin-top', 'calc(-350% + ' + (wScroll - triggerPoint) +'px');
        //$('.courses-2').css('margin-top', 'calc(-450% + ' + (wScroll - triggerPoint) +'px');

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