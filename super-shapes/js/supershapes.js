document.addEventListener('DOMContentLoaded', () => {
    const CSStransforms = anime({
        targets: '#tunnel circle',
        scale: 1.1,
        direction: 'alternate',
        loop: true,
        duration: 250,
        easing: 'easeInOutSine',

        delay: (el, index) => index * 50,
      })

    anime({
        targets: '.conveyor',
        // we only want to move it left by half ot it's width
        translateX: '-50%',
        duration: 4000,
        loop: true,
        // remove the default easing effect to keep smooth
        easing: 'linear'
    })

    /* Line drawing animation
    https://codepen.io/juliangarnier/pen/ZeEpgd */
    const zigZagPath = document.querySelector('#zigzag path');
    // setDashoffset figures out how long our path is
    const zigZagOffset = anime.setDashoffset(zigZagPath);
    // we then set that back onto the path element
    zigZagPath.setAttribute('stroke-dashoffset', zigZagOffset);
    anime({
        targets: zigZagPath,
        strokeDashoffset: [zigZagOffset, 0],
        duration: 3000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
        autoplay: true
    })

    const wavePath = document.querySelector('#wave path');

    const waveOffset = anime.setDashoffset(wavePath);

    wavePath.setAttribute('stroke-dashoffset', waveOffset);
    anime({
        targets: wavePath,
        strokeDashoffset: [0, waveOffset],
        duration: 2000,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine',
    })


    // using JS to duplicate our SVG multiple times
    // https://www.superhi.com/student/advanced/week-3/using-javascript-to-duplicate-our-svg-content-multiple-times 
    
    const duplicateHTML = (element, quantity) => {  
    const newContent = new Array(quantity).fill(element.innerHTML).join('')
    element.innerHTML = newContent
   }
    // here we grab our stars element
    // we duplicate the content 10x using our fancy funcion ^^
    duplicateHTML(document.querySelector('#stars'), 10)
    anime({
        targets: '#stars path',
        rotate: '1turn',
        delay: (el, i) => i * 100,
        duration: 1200,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
      })
    
    duplicateHTML(document.querySelector('#dots'), 40)

    const allDots = document.querySelectorAll('#dots .dot')
    // here we animate each dot individually by looping through
    // and running anime on each individual one
    allDots.forEach(dot => {
        anime({
            targets: dot,
            // gives us a random rotation
            rotate: (el, i) => anime.random(90, 360),
            // random delay
            delay: (el, i) => anime.random(0, 500),
            // random duration
            duration: (el, i) => anime.random(250, 750),
            loop: true,
            easing: 'easeInOutSine',
            direction: 'alternate',
          });
    })
    
    // no looping through here to create random effects
    duplicateHTML(document.querySelector('#circles'), 20)
        anime({
            targets: '#circles .circle-dot',
            // when we use an array, it runs though each property in order
            scale: [0, 1.2],
            delay: (el, i) => i * 100,
            duration: 250,
            loop: true,
            direction: 'alternate',
            easing: 'easeInOutSine'
        });


    anime({
        targets: '#flashes .flash',
        // we put the colors into an array and grab each one by its index
        backgroundColor: (el, i) => ['#FFEE58', '#66BB6A', '#EC407A', '#29B6F6'][i],
        // apply a random delay to each one
        delay: (el, i) => anime.random(50, 100),
        duration: 700,
        loop: true,
        direction: 'alternate',
        easing: 'easeInOutSine'
    })
    
        var pathEls = document.querySelectorAll('#letters path');
            for (var i = 0; i < pathEls.length; i++) {
            var pathEl = pathEls[i];
            var offset = anime.setDashoffset(pathEl);
            pathEl.setAttribute('stroke-dashoffset', offset);
            anime({
                targets: pathEl,
                strokeDashoffset: [offset, 0],
                duration: 3000,
                loop: true,
                direction: 'alternate',
                easing: 'easeInOutSine',
                autoplay: true
            });
        }


        anime({
            targets: '#squares rect',
            // we need to force the translate position to center the squares
            translateX: ['-50%', '-50%'],
            // we’re not actually animating them, it’s a bit of a hack
            translateY: ['-50%', '-50%'],
            // animate rotation from 45 to 0 to -45
            rotate: [45, 0, -45],
            // delay each one incrementally by 100ms
            delay: (el, i) => 100 * i,
            duration: (el, i) => 750,
            loop: true,
            easing: 'easeInOutSine',
            direction: 'alternate'
          })
})
