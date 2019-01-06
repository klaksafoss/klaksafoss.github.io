document.addEventListener("DOMContentLoaded", () => {

	const header = document.querySelector('.header')
	const desktopHeader = document.querySelector('.header-desktop')
	desktopHeader.innerHTML = header.innerHTML

	// when the .header enters the viewport, hide the .header-desktop (remoing the visible class)
	// when the .header levaes the viewport, show (adding the visible class) 

	inView('.header')
		.on('enter', el => {
			desktopHeader.classList.remove('visible')
		})
		.on('exit', el => {
			desktopHeader.classList.add('visible')
			/*
			Can also be written out like this when theres only one thing you want to do:

			.on('enter', el => desktopHeader.classList.remove('visible'))
			.on('exit', el => desktopHeader.classList.add('visible'))
			*/
		})

	// here we grab all the images we want to fade in
	// we add the visible class which toggles the opacity
	inView('.fade')
		.on('enter', img => img.classList.add('visible'))
		.on('exit', img => img.classList.remove('visible'))

	// 1. when we click the .register-button, run a function
	// 2. grab the .front element and add a class of .slide-up
	const registerButton = document.querySelector('.register-button')
	registerButton.addEventListener('click', event => {
		// this will stop any default events from happening
		event.preventDefault()
		const frontEl = document.querySelector('.front')
		frontEl.classList.add('slide-up')
	})

	// STRIPE
	const stripe = Stripe('pk_test_xhERPjpqyGugBxnSSmaNiAPM');

	// Create an instance of Elements.
	const elements = stripe.elements();

	// Custom styling can be passed to options when creating an Element.
	// (Note that this demo uses a wider set of styles than the guide below.)
	const style = {
		base: {
			color: '#32325d',
			lineHeight: '18px',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#aab7c4'
			}
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a'
		}
	};

	// Create an instance of the card Element.
	const card = elements.create('card', {
		style: style
	});

	// Add an instance of the card Element into the `card-element` <div>.
	card.mount('#card-element');

	// Handle real-time validation errors from the card Element.
	card.addEventListener('change', event => {
		const displayError = document.getElementById('card-errors');
		if (event.error) {
			displayError.textContent = event.error.message;
		} else {
			displayError.textContent = '';
		}
	});

	// Handle form submission.
	const form = document.getElementById('payment-form');
	form.addEventListener('submit', event => {
		event.preventDefault();
		stripe.createToken(card).then(function (result) {

			if (result.error) {
				// Inform the user if there was an error.
				const errorElement = document.getElementById('card-errors');
				errorElement.textContent = result.error.message;
			} else {
				// Send the token to your server.
				stripeTokenHandler(result.token);
			}
		});
	});

	// here we handle and make our actual payment
	function stripeTokenHandler(token) {
		// 1. we are going to make a variable for our toke, name and email
		const stripe_token = token.id
		const name = document.querySelector('#name').value
		const email = document.querySelector('#email').value
		// 2. we are going to grab our form action url from our form
		const url = form.getAttribute('action')
		// 3. we'll send the data off to the url using fetch



		fetch(url, {
				// we tell fetch to POST to our URL vs getting from
				method: 'POST',
				// tell it we're sending across json data
				headers: {
					'Content-Type': 'application/json'
				},
				// here we send the data across
				// 4. we also need to make sure that our data is ready/secure to send over
				body: JSON.stringify({
					order: {
						// is the same as stripe_token: stripe_token
						stripe_token,
						// is the same as name: name
						name,
						// is the same as email: email
						email
					}
				})
			})
			// with fetch we get a resonse which we turn into json
			.then(response => response.json())
			// then we get it back as data which we can do stuff with
			.then(data => {
				// here we check we actually get an order back, and then do something
				// with it if we have one
				if (data.order) {
					const order = data.order
					// we are going to tell the user their payment was succesful
					form.querySelector('.form-title').textContent = 'Payment successful!'
					form.querySelector('.form-fields').textContent = `
					Thank you ${order.name}, your payment was successful and we have sent an email receipt to ${order.email}
				  `
					form.classList.remove('processing')
				}
			})
			// if there’s an error, we can do something as well
			.catch(error => {
				// tell the user there was an error
				errorElement.textContent = `There was an error with payment, please try again or contact us at help@goodtim.es`
				form.classList.remove('processing')
			})
	}
})