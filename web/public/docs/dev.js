window.onload = () => {
    let W = document.getElementsByTagName('body')[0].clientWidth;
    document.getElementById("fbtn").style.left = W / 2 - 28 + "px";
    anime({
        targets: '.show0',
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 4000
    });
    anime({
        targets: '.show1',
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 2000
    });
    anime({
        targets: '.show2',
        delay: 1000,
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 2000
    });
    anime({
        targets: '.show3',
        delay: 2000,
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 2000
    });
    anime({
        targets: '.fbtn',
        delay: 3000,
        bottom: 30,
        opacity: 1,
        easing: 'easeInOutSine',
        duration: 1500
    });
    anime({
        targets: '.name',
        // strokeDashoffset: [anime.setDashoffset, 0],
        color: '#15add7',
        easing: 'easeInOutSine',
        duration: 3000,
        // delay: function(el, i) { return i * 250 },
        direction: 'alternate',
        loop: true
    });
}