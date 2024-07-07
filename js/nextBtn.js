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

// Get all blogposts (sorter etter dato)
// const carousel = document.getElementById("carousel-inner")
// Fjern den html som ligger inni der nå
// Lag en for loop som går f.o.m 0 til og med 7
// For hver gang i loopen, legg til en ny div med classen "carousel-item"
// Hent data fra posts[i] i for loop. F.eks posts[i].title....
// Legg til data i diven med classen "carousel-item"
// carousel.appendChild(..) 
