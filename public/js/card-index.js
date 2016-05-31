/**
 * Created by qqy on 15/12/15.
 */
scaleW = window.innerWidth / 320;
scaleH = window.innerHeight / 480;
var resizes = document.querySelectorAll('.resize');
for (var j = 0; j < resizes.length; j++) {
    resizes[j].style.width = parseInt(resizes[j].style.width) * scaleW + 'px';
    resizes[j].style.height = parseInt(resizes[j].style.height) * scaleH + 'px';
    resizes[j].style.top = parseInt(resizes[j].style.top) * scaleH + 'px';
    resizes[j].style.left = parseInt(resizes[j].style.left) * scaleW + 'px';
}

var mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    //pagination: '.swiper-pagination',
    //virtualTranslate : true,
    mousewheelControl: true,
    onInit: function (swiper) {
        swiperAnimateCache(swiper);
        swiperAnimate(swiper);
    },
    onSlideChangeEnd: function (swiper) {
        swiperAnimate(swiper);
    },
    onTransitionEnd: function (swiper) {
        swiperAnimate(swiper);
    },

    watchSlidesProgress: true,

    onProgress: function (swiper) {
        for (var i = 0; i < swiper.slides.length; i++) {
            var slide = swiper.slides[i];
            var progress = slide.progress;
            var translate = progress * swiper.height / 4;
            scale = 1 - Math.min(Math.abs(progress * 0.5), 1);
            //var opacity = 1 - Math.min(Math.abs(progress / 2), 0.5);
            slide.style.opacity = 1;
            es = slide.style;
            es.webkitTransform = es.MsTransform = es.msTransform = es.MozTransform = es.OTransform = es.transform = 'translate3d(0,' + translate + 'px,-' + translate + 'px) scaleY(' + scale + ')';
        }
    },

    onSetTransition: function (swiper, speed) {
        for (var i = 0; i < swiper.slides.length; i++) {
            es = swiper.slides[i].style;
            es.webkitTransitionDuration = es.MsTransitionDuration = es.msTransitionDuration = es.MozTransitionDuration = es.OTransitionDuration = es.transitionDuration = speed + 'ms';
        }
    }
});

$("#pregnant").on("click", function () {
    toEdit("card-pregnant.html");
});

$("#mother").on("click", function () {
    toEdit("card-mother.html");
});

$("#santaclaus").on("click", function () {
    toEdit("card-santaclaus.html");
});


function toEdit(url) {
    $("#check").on("click", function () {
        location.href = url;
    });
    $('#myModal').modal('show');
}
