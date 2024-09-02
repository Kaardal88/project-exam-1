const imageModal = document.getElementById('image-modal');
const closeModal = document.getElementById('close-modal');
const modalImage = document.getElementById('big-modal-image');
const captionText = document.getElementById('caption');

export function openModal(mediaUrl, altText) {
    imageModal.style.display = 'block';
    modalImage.src = mediaUrl;
    captionText.innerHTML = altText;
}

closeModal.onclick = function () {
    imageModal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == imageModal) {
        imageModal.style.display = 'none';
    }
}

document.getElementById('post').addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG') {
        openModal(event.target.src, event.target.alt);
    } else {
        event.stopPropagation();
    }
});
