document.addEventListener('DOMContentLoaded', () => {
    let currentImgElement;
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

	document.onkeydown = function (e) {
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
		} else if (e.keyCode == '39') {
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