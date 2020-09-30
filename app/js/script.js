$(document).ready(function() {
    $('.slider').slick({
        centerMode: true,
        centerPadding: '90px',
        dots: true,
        infinite: true,
        speed: 300,
        focusOnSelect: true,
        prevArrow: '<a class="slide-arrow prev-arrow"><i class="lni lni-arrow-left" style="font-size:40px"></i></a>',
        nextArrow: '<a class="slide-arrow next-arrow"><i class="lni lni-arrow-right" style="font-size:40px"></i></a>',
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [{
                breakpoint: 992,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '90px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider-single').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        fade: false,
        adaptiveHeight: true,
        infinite: false,
        useTransform: true,
        speed: 400,
        cssEase: 'cubic-bezier(0.77, 0, 0.18, 1)',
    });

    $('.slider-nav')
        .on('init', function(event, slick) {
            $('.slider-nav .slick-slide.slick-current').addClass('is-active');
        })
        .slick({
            slidesToShow: 7,
            slidesToScroll: 7,
            dots: false,
            focusOnSelect: false,
            infinite: false,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                }
            }, {
                breakpoint: 640,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                }
            }, {
                breakpoint: 420,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                }
            }]
        });

    $('.slider-single').on('afterChange', function(event, slick, currentSlide) {
        $('.slider-nav').slick('slickGoTo', currentSlide);
        var currrentNavSlideElem = '.slider-nav .slick-slide[data-slick-index="' + currentSlide + '"]';
        $('.slider-nav .slick-slide.is-active').removeClass('is-active');
        $(currrentNavSlideElem).addClass('is-active');
    });

    $('.slider-nav').on('click', '.slick-slide', function(event) {
        event.preventDefault();
        var goToSingleSlide = $(this).data('slick-index');

        $('.slider-single').slick('slickGoTo', goToSingleSlide);
    });
    $('.video').magnificPopup({
        type: 'iframe',
        iframe: {
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                },
            }
        }
    });
});

let countDown = new Date('December 31, 2020 00:00:00').getTime();
let now = new Date().getTime();
let distance = (countDown - now) / 1000;
console.log(distance);
let x = setInterval(function() {
    let now_ = new Date().getTime();
    let distance_ = (countDown - now_);
    distance = (countDown - now);
    percent = (distance_ / distance * 100);
    seconds = Math.floor(distance_ / 1000 % 60);
    minutes = Math.floor(distance_ / (1000 * 60) % 60);
    hours = Math.floor(distance_ / (1000 * 60 * 60) % 60);
    days = Math.floor(distance_ / (1000 * 60 * 60 * 24) % 100);

    progress(percent, percent, $('#progressBar'));
    document.getElementById('days').innerText = days;
    document.getElementById('hours').innerText = hours;
    document.getElementById('minutes').innerText = minutes;
    document.getElementById('seconds').innerText = seconds;
}, 1000);


function progress(timeleft, timetotal, $element) {
    var progressBarWidth = timeleft * $element.width() / timetotal;
    $element.find('div').animate({
        width: timeleft + '%'
    }, 0);

};

function increaseValue() {
    var value = parseInt(document.getElementById('theInput').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('theInput').value = value;
}

function decreaseValue() {
    var value = parseInt(document.getElementById('theInput').value, 10);
    value = isNaN(value) ? 0 : value;
    value < 1 ? value = 1 : '';
    value--;
    document.getElementById('theInput').value = value;
}