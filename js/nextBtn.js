const carouselInner = document.querySelector('.carousel-inner');
    const nextButton = document.getElementById('next');
    const prevButton = document.getElementById('prev');
    let offset = 0;

    nextButton.addEventListener('click', () => {
        if (offset > -300) {
            offset -= 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
    });

    prevButton.addEventListener('click', () => {
        if (offset < 0) {
            offset += 100;
            carouselInner.style.transform = `translateX(${offset}%)`;
        }
    });