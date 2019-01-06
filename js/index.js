document.addEventListener('DOMContentLoaded', () => {
    var pathEls = document.querySelectorAll('#lines path');
    for (var i = 0; i < pathEls.length; i++) {
        var pathEl = pathEls[i];
        var offset = anime.setDashoffset(pathEl);
        pathEl.setAttribute('stroke-dashoffset', offset);
        anime({
            targets: pathEl,
            strokeDashoffset: [offset, 0],
            duration: 3000,
            delay: anime.random(0, 2000),
            loop: false,
            direction: 'alternate',
            easing: 'easeInOutSine',
            autoplay: true
        });
    }

    const aboutNavElement = document.querySelector('a.nav-link.about');
    const aboutContentElement = document.getElementById('about');
    aboutNavElement.addEventListener('click', event => {
        aboutContentElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
	})


    // const arrow = document.querySelector('.down-arrow')

    // inView('.profile-photo')
    //     .on('enter', el => {
    //         arrow.classList.add('invisible')
    //     })
    //     .on('exit', el => {
    //         arrow.classList.remove('invisible')
    //     })


    const designTimeline = anime.timeline({
        delay: anime.random(3000, 5000),
        loop: true
    })

    designTimeline
        .add({
            targets: '.des-icon img',
            translateX: '140px',
            duration: 2000,
            easing: 'easeOutQuart'
        })
        .add({
            targets: '.des-icon img',
            translateX: 0,
            duration: 2000,
            easing: 'easeOutQuart'
        })

    const devTimeline = anime.timeline({
        delay: anime.random(3000, 5000),
        loop: true,
    })

    devTimeline
        .add({
            targets: '.dev-icon img',
            translateX: '-150px',
            duration: 2000,
            easing: 'easeOutQuart'
        })
        .add({
            targets: '.dev-icon img',
            translateX: 0,
            duration: 2000,
            easing: 'easeOutQuart'
        })
})