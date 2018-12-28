let currentImgElement;

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

    const navEl = document.querySelector('.nav-list')
    const hamburgerMenu = document.querySelector('.hamburger-menu')
    hamburgerMenu.addEventListener('click', event => {
        event.preventDefault()
        navEl.classList.add('slide-in')
    })

    const closeButton = document.querySelector('.close')
    closeButton.addEventListener('click', event => {
        event.preventDefault()
        navEl.classList.remove('slide-in')
    })

    const lightbox = document.querySelector('.lightbox')
    const lightboxContent = document.querySelector('.lightbox .lightbox-content')

    const imgs = document.querySelectorAll('.art-container img')
    for (const img of imgs) {
        img.addEventListener('click', event => {
            event.preventDefault()
            lightbox.classList.add('fade-in')
            currentImgElement = event.currentTarget;
            var content = currentImgElement.outerHTML
            lightboxContent.innerHTML = content
        })
    }

    const lightboxBackground = document.querySelector('.lightbox .lightbox-background')
    lightboxBackground.addEventListener('click', event => {
        event.preventDefault()
        lightbox.classList.remove('fade-in')
        currentImgElement = undefined;
    })

    document.onkeydown = function(e) {
        if (e.keyCode == '37') {
            // left arrow
            if (!currentImgElement) {
                return;
            }
            const previous = currentImgElement.previousElementSibling
            if (!previous) {
               return;
            }
            currentImgElement = previous;
            lightboxContent.innerHTML = previous.outerHTML
        }
        else if (e.keyCode == '39') {
            // right arrow
            if (!currentImgElement) {
                return;
            }
            const next = currentImgElement.nextElementSibling;
            if (!next) {
                return;
            }
            currentImgElement = next
            lightboxContent.innerHTML = next.outerHTML
        } else if (e.keyCode == '27') {
            // escape
            if (!currentImgElement) {
                return;
            }
            lightbox.classList.remove('fade-in')
            currentImgElement = undefined;
        }
    };
})