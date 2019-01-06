document.addEventListener("DOMContentLoaded", function() {
    
    // here we declare our function called makeMarquee

    function makeMarquee () {
        const title = 'FIFTY Music Festival - November 10-12, Desert Valley'

        // an array is a list of things
        // ['Karin', 'Sam', 'Kyrri']
        // here we make an array with 50 spaces in it
        // then we fill it with text from our title (50 times)
        // we then join them all together as one string using a ' - '
        
        const marqueeText = new Array(50).fill(title).join(' - ')
    
        const marquee = document.querySelector('.marquee span')
    
        marquee.innerHTML = marqueeText
    }
 
    // here we actually run our function
    makeMarquee ()

    function random(min, max) {
        return Math.floor(Math.random() * (max - min +1) + min);
    }

    // here we grab all our .circles from our HTML
    const circles = document.querySelectorAll('.circle')

    // circles returns us an array so we need to loop through it
    circles.forEach((circle, index) => { 
        
        // in here we get access to each one as circle
        circle.animate([
            // keyframes
            { transform: 'scale(1)' }, 
            { transform: 'scale(1.2)' },
            { transform: 'scale(1)'}
        ], { 
            // timing options
            duration: 3000,
            // here we use the index to create a staggered animation delay
            delay: index * 300,
            iterations: Infinity
        });
    })

    const squiggles = document.querySelectorAll('.squiggle')

    squiggles.forEach((squiggle, index) => {
        // gets a random number between 10 and 45
        // from stack overflow
        const randomNumber = random(10, 45)

        // create a bit of randomness for our animation delay
        squiggle.animate([
            { transform: 'rotate(0deg)' },
            // here we join our random number into our rotate property
            // { transform: 'rotate(' + randomNumber + 'deg)' },

            { transform: `rotate(${randomNumber}deg)` },  
            { transform: 'rotate(0deg)' },
        ], { 
            // timing options
            duration: 3000,
            delay: 300 * index,            
            iterations: Infinity
        });
    })

    // here we want to detect when our .section enters the viewport
    // when it does we want to add a class of 'in-viewport', and 
    // and when it exits we want to remove it again

    inView('.section')
    .on('enter', section => {
        // classList.add is the same as JQuery's .addClass() method
        // but the vanilla JS version:
        section.classList.add('in-viewport')
    })
    .on('exit', section => {
        section.classList.remove('in-viewport')
    });

    // here we have set the class to add only when we have scrolled 0.2 
    // of our section into the viewport
     inView.threshold(0.2)

    // 1. we want to select all of our sections and loop through them
    // 2. in each section we want to grab the artists and shapes
    // 3. for both of these we want to add transition-dealy effects
    // we want to make sure that our shapes fade in only after our artists

    const sections = document.querySelectorAll('.section')

    sections.forEach((section, index) => {
        /* here we use .querySelectorAll on our .section to only find
        elements inside our section vs. the entire page */
        const artists = section.querySelectorAll('.lineup li')
        const shapes = section.querySelectorAll('.shape')

        artists.forEach((artists, index) => {
    
            const delay = index * 100
            artists.style.transitionDelay = delay + 'ms'
        })

        shapes.forEach((shape, index) => {
            /* we are setting our delay up to only start once
            all of our artists have faded in using the .lenght property */
            const delay = (artists.length + index) * 100
            shape.style.transitionDelay = delay + 'ms'
        })
    })

    /* 1. whenever we click a .js-scroll link, we want to run a function
       2. we want to stop our link from jumping straight to our next section
       (it's default behaviour) 
       3. we want to find out the href attribute, and then grab that element 
       4. then scroll to it using scrollIntoView*/

    const scrollLinks = document.querySelectorAll('.js-scroll')

    scrollLinks.forEach(link => {
        // .addEventListener is just the same as jQuery's .on()
        // we can listen for events on elements and then run a function
        link.addEventListener('click', (event) => {
            /* using the event keyword we get a snapshot of what
            happened when we clicked on our link */

            // this is the equivalent to return false in jQuery
            // it will block the browser default behavior of jimping to
            // th ehref attribute
            event.preventDefault()

            // here we grab the href attribute from our link
            const href = link.getAttribute('href')

            // here we use the new scrollIntoView fetaure to scroll to
            // our desired element in a smooth fashion  
            document.querySelector(href).scrollIntoView ({
                behavior: 'smooth'
            })
        })
    })

 });
