const menuButton = document.querySelector('#menu-button')
const mobileNavList = document.querySelector('#mobile-nav-list')
const blury = document.getElementById('blury')

menuButton.addEventListener('click', () => {
    mobileNavList.classList.toggle('hide');

    if (mobileNavList.classList.contains('hide')) {
        menuButton.textContent = '☰';
        blury.classList.remove('blur');
    } else {
        menuButton.textContent = '✖';
        blury.classList.toggle('blur')
    }
});

document.addEventListener('click', e => {
    if (!mobileNavList.contains(e.target) && e.target !== menuButton) {
        mobileNavList.classList.add('hide');
        menuButton.textContent = '☰';
        blury.classList.remove('blur');
    }
});

