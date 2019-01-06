document.addEventListener("DOMContentLoaded", () => {
   
    const API_KEY ='uAG7BVMfQVCUuNx756g0vRktrYna9A7I'

    // here we grab our search input
    const searchEl = document.querySelector('.search-input')

    // here we grab our search hint 
    const hintEl = document.querySelector('.search-hint')
    
    // here we grab our videos element (in index.html) - then append videos to it
    const videosEl = document.querySelector('.videos')

    // this is for our clear search function
    const clearEl = document.querySelector('.search-clear')
    
    // from StackOvfl https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
    const randomChoice = arr => {
        const randIndex = Math.floor(Math.random() * arr.length);
        return arr[randIndex];
    };
   
    const createVideo = src => {
        // .createElement lets us create html elements inside of js
        const video = document.createElement('video')
        // here we can set attributes onto our created element using the dot notation
        video.src = src
        video.muted = true
        video.autoplay = true
        video.loop = true
        // this is how we set class names using js (will overwrite them though)
        video.className = 'video'
        console.log(video)

        // when we use return we tell the function to give us something back
        return video
    }

    // 1.when we search, show the loading spinner (by adding a class to the body)
    // 2. when successful change the loading hint to say 'see more'
    // 3. on fail, let the user know there was an error

    const toggleLoading = state => {
        // console.log('we are loading', state)
        // here we toggle the loading page between loading and not loading
        // if our state is true, we add a loading class to our body

        if (state) {
            document.body.classList.add('loading')
            // here we disable the input so users can't interfere with it
            // whilst it's searching
            searchEl.disabled = true
        } else {
            // otherwise we remove our loading class
            document.body.classList.remove('loading')
            // here we enable the input again
            searchEl.disabled = false
            searchEl.focus()
        }
    }

    const searchGiphy = searchTerm => {
        // here we toggle our loading screen so our user knows sth is happening
        toggleLoading(true)
    
        console.log('search for', searchTerm)
        // here we out our URL into fetch
        // we use backtics for our string so that we can embed our API_KEY and searchTerm var
        // the searchTerm part will be different for every search we make
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=PG-13&lang=en`)
        
        // we use .then() to handle the response
        .then(response => { 
            // here we need to convert our response to json
            return response.json();
        })
        // we use .then() again to handle the json data 
        .then(json => {
            // json is a big piece of json data that we then can work with
            
            // here we grab a random result form our images array
            const gif = randomChoice(json.data)
            // here we look inside the result and grab the original mp4 src
            const src = gif.images.original.mp4

            // here we call our randomChoice function to give back
            // a random result from our array of images
            const video = createVideo(src)

            videosEl.appendChild(video)
            
            // here we listen out for the video loaded event to fire
            // when it's loaded we'll display it on the page using a class
            // that triggers a transition effect
            video.addEventListener('loadeddata', event => {
            
                video.classList.add('visible')
                // here we toggle the loading state off again            
                toggleLoading(false)
                // here we add a 'has-result' class to toggle the close button 
                document.body.classList.add('has-results')
                // change the hint text to 'see more results'
                hintEl.innerHTML = `Hit enter to search more ${searchTerm}`
            })
        })
        
        .catch(error => {
            // lastly, we can use .catch() to do sth in case our fetch fails 
            // here we toggle the loading state so it's disabled
            toggleLoading(false)
            // here we tell the user nothing was found
            hintEl.innerHTML = `Nothing found for ${searchTerm}`
        })
    }

    
    const doSearch = event => {

        const searchTerm = searchEl.value

        if (searchTerm.length > 2) {
            // here we set the text to embed our variable as the hint suggestion
            hintEl.innerHTML = `Hit enter to search ${searchTerm}`
            // here we add a class to our body tag and use it to show our hint using css
            document.body.classList.add('show-hint')
        } else {
            // otherwise we remove it again
            document.body.classList.remove('show-hint')
        }

        /* is we only want to run our search when we have a 
        search term that is longer than 2 characters 
        and when they press the enter key */
        if (event.key === 'Enter' && searchTerm.length > 2) {
            // here we call to our searchGiphy function and pass alon our searchTerm with it
            searchGiphy(searchTerm)
        }
    }

    const clearSearch = event => {
        // this toggles our results state off again
        document.body.classList.remove('has-results')
        // here we reset all the content on our video and hint elements

        videosEl.innerHTML = ''
        hintEl.innerHTML = ''
        searchEl.value = ''
        // here we focus the input cursor back onto our input
        searchEl.focus()
    }

    // here we listen out for keyup events globally across the whole page
    // we use thedocument keyword and attach the addEventListener to it
    document.addEventListener('keyup', event => {
        // if we pewss the ESC key, fire the clearSearch function
        if (event.key === 'Escape') {
            clearSearch()
        }
    })

    searchEl.addEventListener('keyup', doSearch)

    clearEl.addEventListener('click', clearSearch)
});