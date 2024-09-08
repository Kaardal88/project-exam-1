import { api } from "./api/api.js";
import { mediaApi } from "./api/api.js";
/* import { showSpinner } from "./js/loader.js"; */

const container = document.getElementById('blog-items-container');
const viewMoreButton = document.getElementById('view-more');
const viewLessButton = document.getElementById('view-less');
const errorElement = document.getElementById('error-handling');
let posts = [];
let currentIndex = 0;
const increment = 10;
let isFetching = false;

async function fetchPosts() {
    try {
        const response = await fetch(`${api}?per_page=30`);
        if (!response.ok) throw new Error('Ooops! Something went wrong. Try again later:)');
        posts = await response.json();
        renderPosts();
        preloadNextBatch();
    } catch (error) {
        console.error('Fetch error:', error);
        errorElement.innerHTML = 'Ooops! Something went wrong. Try again later :)';
    }
}

async function featuredMedia(mediaId) {
    try {
        const response = await fetch(`${mediaApi}/${mediaId}`);
        const media = await response.json();
        return media.source_url;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

async function renderPosts() {
    container.innerHTML = '';
    const visiblePosts = posts.slice(0, currentIndex + increment);

    const mediaPromises = visiblePosts.map(post => featuredMedia(post.featured_media));
    const mediaUrls = await Promise.all(mediaPromises);

    visiblePosts.forEach((post, index) => {
        const mediaUrl = mediaUrls[index];

        const postId = post.id;
        const postTitle = encodeURIComponent(post.title.rendered);
        const postUrl = `blog.html?id=${postId}&title=${postTitle}&slug=$`;

        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2><a href="${postUrl}">${post.title.rendered}</h2>
            <img src="${mediaUrl ? mediaUrl : 'default-image.jpg'}" alt="Thumbnail">
            <p>${post.excerpt.rendered}</p></a>`;
        container.appendChild(postElement);
    });

    updateButtons();
    preloadNextBatch();
}

async function preloadNextBatch() {
    if (currentIndex + increment >= posts.length || isFetching) return;

    isFetching = true;

    const nextPosts = posts.slice(currentIndex + increment, currentIndex + increment * 2);
    const mediaPromises = nextPosts.map(post => featuredMedia(post.featured_media));
    await Promise.all(mediaPromises);

    isFetching = false;
}

function showSpinner(count) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const loaderContainer = document.createElement('div');
        loaderContainer.className = 'loader-container';
        container.appendChild(loaderContainer);
        isFetching = false;
        loaderContainer.style.display = 'hidden';
    }
}





function updateButtons() {
    if (currentIndex + increment >= posts.length) {
        viewMoreButton.style.display = 'none';
    } else {
        viewMoreButton.style.display = 'block';
    }

    if (currentIndex > 0) {
        viewLessButton.style.display = 'block';
    } else {
        viewLessButton.style.display = 'none';
    }
}

viewMoreButton.addEventListener('click', () => {
    currentIndex += increment;
    showSpinner();
    renderPosts();
});

viewLessButton.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - increment, 0);
    renderPosts();
});

fetchPosts();





/* import { api } from "./api/api.js";
import { mediaApi } from "./api/api.js";

const container = document.getElementById('blog-items-container');
const viewMoreButton = document.getElementById('view-more');
const viewLessButton = document.getElementById('view-less');
const errorElement = document.getElementById('error-handling');
let posts = [];
let currentIndex = 0;
const increment = 10;

async function fetchPosts() {
    try {
        const response = await fetch(`${api}?per_page=100`);
        if (!response.ok) throw new Error('Ooops! Something went wrong. Try again later:)');
        posts = await response.json();
        renderPosts();
    } catch (error) {
        console.error('Fetch error:', error);
        errorElement.innerHTML = 'Ooops! Something went wrong. Try again later :)';
    }
}

async function featuredMedia(mediaId) {
    try {
        const response = await fetch(`${mediaApi}/${mediaId}`);
        const media = await response.json();
        return media.source_url;
    } catch (error) {
        console.error('Fetch error:', error);
        errorElement.innerHTML = 'Ooops! Something went wrong. Try again later :)';
    }
}

async function renderPosts() {
    container.innerHTML = '';
    const visiblePosts = posts.slice(0, currentIndex + increment);

    for (const post of visiblePosts) {
        const mediaUrl = await featuredMedia(post.featured_media);

        const postId = post.id;
        const postTitle = encodeURIComponent(post.title.rendered);
        const postUrl = `blog.html?id=${postId}&title=${postTitle}&slug=$`;

        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h2><a href="${postUrl}">${post.title.rendered}</h2>
            <img src="${mediaUrl ? mediaUrl : 'default-image.jpg'}" alt="Thumbnail">
            <p>${post.excerpt.rendered}</p></a>`;
        container.appendChild(postElement);
    }

    updateButtons();
}

function updateButtons() {
    if (currentIndex + increment >= posts.length) {
        viewMoreButton.style.display = 'none';
    } else {
        viewMoreButton.style.display = 'block';
    }

    if (currentIndex > 0) {
        viewLessButton.style.display = 'block';
    } else {
        viewLessButton.style.display = 'none';
    }
}

viewMoreButton.addEventListener('click', () => {
    currentIndex += increment;
    renderPosts();
});

viewLessButton.addEventListener('click', () => {
    currentIndex = Math.max(currentIndex - increment, 0);
    renderPosts();
});

fetchPosts();
 */