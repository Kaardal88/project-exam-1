function toggleMobileMenu() {
    const mobileNavList = document.getElementById('mobile-nav-list');
    if (mobileNavList.style.display === 'block') {
        mobileNavList.style.display = 'none';
    } else {
        mobileNavList.style.display = 'block';
    }
}