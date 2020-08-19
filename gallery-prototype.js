function Gallery(gallery) {
    if (!gallery) {
        throw Error('No Gallery found');
    }

    this.gallery = gallery;

    this.images = Array.from(gallery.querySelectorAll('img'));
    this.modal = document.querySelector('.modal');
    this.prevButton = this.modal.querySelector('.prev');
    this.nextButton = this.modal.querySelector('.next');

    this.showNextImage = this.showNextImage.bind(this);
    this.showPrevImage = this.showPrevImage.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    
    //Update the modal with this info
    this.images.forEach(image => {
        image.addEventListener('click', e => this.showImage(e.currentTarget));
    });

    this.images.forEach(image => {
        image.addEventListener('keyup', e => {
            if (e.key === 'Enter') {
                this.showImage(e.currentTarget);
            }
        });
    });
}

Gallery.prototype.openModal = function() {
    console.info('Opening modal');
    if (this.modal.matches('.open')) {
        console.info('Modal already open');
        return;
    }
    this.modal.classList.add('open');
    //Event listeners to be bound when we open the modal
    window.addEventListener('keyup', this.handleKeyUp);
    this.modal.addEventListener('click', this.handleClickOutside);
    this.nextButton.addEventListener('click', this.showNextImage);
    this.prevButton.addEventListener('click', this.showPrevImage);
}

Gallery.prototype.closeModal = function() {
    this.modal.classList.remove('open');
    //TODO: add events listeners for clicks and keyboard
    window.removeEventListener('keyup', this.handleKeyUp);
    this.nextButton.removeEventListener('click', this.showNextImage);
    this.modal.removeEventListener('click', this.handleClickOutside);
    this.prevButton.removeEventListener('click', this.showPrevImage);
}

Gallery.prototype.showNextImage = function() {
    this.showImage(this.currentImage.nextElementSibling || this.gallery.firstElementChild);
}

Gallery.prototype.showPrevImage = function() {
    this.showImage(this.currentImage.previousElementSibling || this.gallery.lastElementChild);
}

Gallery.prototype.handleClickOutside = function(e) {
    if (e.target === e.currentTarget) {
        this.closeModal();
    }
}

Gallery.prototype.handleKeyUp = function(e) {
    if (e.key === 'Escape') return this.closeModal();
    if (e.key === 'ArrowRight') return this.showNextImage();
    if (e.key === 'ArrowLeft') return this.showPrevImage();
}

Gallery.prototype.showImage = function(el) {
    if (!el) {
        console.info('No image to show');
        return;
    }
    this.modal.querySelector('img').src = el.src;
    this.modal.querySelector('h2').textContent = el.title;
    this.modal.querySelector('figure p').textContent = el.dataset.description;
    // 
    this.currentImage = el;
    this.openModal();
}

const gallery1 = new Gallery(document.querySelector('.gallery1'));
const gallery2 = new Gallery(document.querySelector('.gallery2'));
const gallery3 = new Gallery(document.querySelector('.gallery3'));

console.log(gallery1, gallery2, gallery3);


