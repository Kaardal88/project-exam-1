document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-light-mode');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');

        if (toggleButton.innerText === 'Enter Night') {
            toggleButton.innerText = 'Hit The Lights';
        } else {
            toggleButton.innerText = 'Enter Night';
        }

    })



});
