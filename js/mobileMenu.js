

const menuButton = document.querySelector('#menu-button')
const mobileNavList = document.querySelector('#mobile-nav-list')

menuButton.addEventListener('click', () => {
    mobileNavList.classList.toggle('hide');
})

document.addEventListener('click', e => {
    if (!mobileNavList.contains(e.target) && e.target !== menuButton) {
        mobileNavList.classList.add('hide')
    }
})