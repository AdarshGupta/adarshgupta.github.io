$(function(){
    mentoringBubbleClick();
    setInterval(function(){articleTada()}, 4000);
    designBGStuff();
    smoothScroll(300);
    mobileNav();
    projectNav();
});

function mobileNav() {
    $('.mobile-nav-toggle').on('click', function(){
      $('.mobile-nav-toggle, .mobile-nav').toggleClass('is-open');
    });
}

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

function designBGStuff(){
    $('.design-img-link').hover(function(){
        $(this).parent().parent().parent().css('background-color', $(this).data('color'));
    }, function(){
        $(this).parent().parent().parent().css('background-color', $(this).parent().parent().parent().data('orig-color'));
    });
}

function articleTada(){
    var randNum = Math.floor(Math.random() * $('.article-thumb').length) + 1
    $('.article-thumb').eq(randNum).addClass('is-emph')
        .siblings().removeClass('is-emph');
}

function mentoringBubbleClick(){
    $('.face').on('click', function(){

        var $this = $(this);
        var faceTop = $this.position().top;
        var vertMath = -(faceTop - 230);

        var faceLeft = $this.position().left;
        var horizMath = 0 - faceLeft;

        if($(window).width() > 640){
            $this.parent().css('top', vertMath + 'px');
        }
        else{
            if($this.hasClass('back-btn')){
                mentoringNarrowStart();
            }
            else{
                $this.parent().css('left', horizMath + 'px');
            }
        }

        if(!$this.hasClass('back-btn')){
            $(this).addClass('has-bubble-open')
                    .siblings().removeClass('has-bubble-open');
        }
    });
}


$(window).scroll(function(){
    youtubeVidScroll();
    startMentoring();
    startArticles();
});

function youtubeVidScroll(){
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

function startMentoring(){
    var wScroll = $(window).scrollTop();

    if($('section.mentoring').offset().top - $(window).height()/2 < wScroll){

        if($(window).width() > 640){
            $('.faces').addClass('launched');

            if(!$('.face').hasClass('has-bubble-open')){
                setTimeout(function(){
                    $('.face:nth-child(3)').addClass('has-bubble-open');
                }, 400);
            }
        }
        else{
            mentoringNarrowStart();
        }
    }
}

function mentoringNarrowStart(){
    $('.faces').css({
        'top': '230px',
        'left': '0px'
    });
    $('.face').first().addClass('has-bubble-open')
        .siblings().removeClass('has-bubble-open');
}

function mentoringWideStart(){
    $('.faces').css({
        'top': '0px',
        'left': '0px'
    });
    $('.face:nth-child(3)').addClass('has-bubble-open')
        .siblings().removeClass('has-bubble-open');
}

function startArticles(){
    var wScroll = $(window).scrollTop();

    if($('section.articles').offset().top - $(window).height()/2 < wScroll){
        $('.article-thumb').each(function(i){
            setTimeout(function(){
                $('.article-thumb').eq(i).addClass('is-visible');
            }, 200 * i);
        });
    }
}

$(window).resize(function(){
    if($(window).width() > 640){
        mentoringWideStart();
    }
    else{
        mentoringNarrowStart();
    }
});


// Project panel switch based on project selection
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