import { api } from "./api/api.js";
import { getAllPublishedPosts } from "./api/api.js";
import { mediaApi } from "./api/api.js";

let posts = [];
let currentPage = 0;
const postsPerPage = [12

];

async function fetchPosts() {
    try {
        const response = await fetch(api);
        if (!response.ok) throw new Error('Ooops! Something went wrong...');
        const data = await response.json();
        posts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        displayPosts();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function fetchMedia() {
    try {
        const response = await fetch(mediaApi);
        if (!response.ok) throw new Error('Ooops! Something went wrong...');
        const data = await response.json();
        posts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        displayMedia();
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayMedia( => {
    const mediaContainer = document.getElementById('media-container');
    mediaContainer.className = 'card';
    mediaContainer.innerHTML = '
    < div class=
    ';


})

function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    const start = currentPage * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    pagePosts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'card';
        postElement.innerHTML = `
            <div class="card-title">${post.title.rendered}</div>
            <div class="card-title">${post.excerpt.rendered}</div>
        `;
        postElement.addEventListener('click', () => {
            window.location.href = `blog.html?id=${post.id}`;
        });
        postsContainer.appendChild(postElement);
    });
}





fetchPosts();
