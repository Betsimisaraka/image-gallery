function Gallery(gallery) {
    if (!gallery) {
        throw Error('No Gallery found');
    }
    const images = Array.from(gallery.querySelectorAll('img'));
    const modal = document.querySelector('.modal');
    const prevButton = modal.querySelector('.prev');
    const nextButton = modal.querySelector('.next');
    let currentImage;

    function openModal() {
        console.info('Opening modal');
        if (modal.matches('.open')) {
            console.info('Modal already open');
            return;
        }
        modal.classList.add('open');
        //Event listeners to be bound when we open the modal
        window.addEventListener('keyup', handleKeyUp);
        modal.addEventListener('click', handleClickOutside);
        nextButton.addEventListener('click', showNextImage);
        prevButton.addEventListener('click', showPrevImage);
    }

    function closeModal() {
        modal.classList.remove('open');
        //TODO: add events listeners for clicks and keyboard
        window.removeEventListener('keyup', handleKeyUp);
        nextButton.removeEventListener('click', showNextImage);
        modal.removeEventListener('click', handleClickOutside);
        prevButton.removeEventListener('click', showPrevImage);
    }

    function showNextImage() {
        showImage(currentImage.nextElementSibling || gallery.firstElementChild);
    }

    function showPrevImage() {
        showImage(currentImage.previousElementSibling || gallery.lastElementChild);
    }

    function handleClickOutside(e) {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    function handleKeyUp(e) {
        if (e.key === 'Escape') return closeModal();
        if (e.key === 'ArrowRight') return showNextImage();
        if (e.key === 'ArrowLeft') return showPrevImage();
    }

    function showImage(el) {
        if (!el) {
            console.info('No image to show');
            return;
        }
        modal.querySelector('img').src = el.src;
        modal.querySelector('h2').textContent = el.title;
        modal.querySelector('figure p').textContent = el.dataset.description;
        // 
        currentImage = el;
        openModal();
    }
    //Update the modal with this info
    images.forEach(image => {
        image.addEventListener('click', e => showImage(e.currentTarget));
    });

    images.forEach(image => {
        image.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                showImage(e.currentTarget);
            }
        });
    });
}

const gallery1 = Gallery(document.querySelector('.gallery1'));
const gallery2 = Gallery(document.querySelector('.gallery2'));
const gallery3 = Gallery(document.querySelector('.gallery3'));


