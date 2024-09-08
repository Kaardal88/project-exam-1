const hideHero = document.querySelector('.hero');
const showInfo = document.querySelector('.info-content');

window.addEventListener('scroll', function () {
    if (window.scrollY > 250) {
        showInfo.style.visibility = 'visible';

    } else {
        hideHero.style.visibility = 'visible';
        showInfo.style.visibility = 'hidden';

    }
});