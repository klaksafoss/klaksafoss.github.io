document.addEventListener('DOMContentLoaded', () => {
	let scrollpos = window.scrollY
	const header = document.querySelector(".nav")
	const header_height = header.offsetHeight

	const add_class_on_scroll = () => header.classList.add("nav-background")
	const remove_class_on_scroll = () => header.classList.remove("nav-background")

	window.addEventListener('scroll', function () {
		scrollpos = window.scrollY;

		if (scrollpos >= header_height) {
			add_class_on_scroll()
		} else {
			remove_class_on_scroll()
		}
	})

	// const arrow = document.querySelector('.down-arrow')

	// inView('.profile-photo')
	//     .on('enter', el => {
	//         arrow.classList.add('invisible')
	//     })
	//     .on('exit', el => {
	//         arrow.classList.remove('invisible')
	//     })

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
})