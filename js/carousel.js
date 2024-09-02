import { api } from "./api/api.js";
import { mediaApi } from "./api/api.js";
const errorElement = document.getElementById('error-handling');

let posts = [];
let currentPage = 0;
const postsPerPage = 4;

async function fetchPosts() {
    try {
        const response = await fetch(api);
        if (!response.ok) throw new Error('Ooops! Something went wrong...');
        const data = await response.json();
        posts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        displayPosts();
    } catch (error) {
        console.error('Fetch error:', error);
        errorElement.innerHTML = 'Ooops! Something went wrong. Try again later :)';
    }
}

async function fetchMedia(mediaId) {
    try {
        const response = await fetch(`${mediaApi}/${mediaId}`);
        if (!response.ok) throw new Error('Ooops! Something went wrong...');
        const media = await response.json();
        return media.source_url;
    } catch (error) {
        console.error('Fetch error:', error);
        errorElement.innerHTML = 'Ooops! Something went wrong. Try again later :)';
    }
}

async function displayPosts() {
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';
    const start = currentPage * postsPerPage;
    const end = start + postsPerPage;
    const pagePosts = posts.slice(start, end);

    for (const post of pagePosts) {
        const postElement = document.createElement('div');
        postElement.className = 'card';

        const postTitle = encodeURIComponent(post.title.rendered);
        const postId = post.id;
        const postUrl = `blog.html?id=${postId}&title=${postTitle}`;




        let mediaHtml = '';
        if (post.featured_media) {
            const mediaUrl = await fetchMedia(post.featured_media);
            if (mediaUrl) {
                mediaHtml = `<img class="carousel-images" src="${mediaUrl}" alt="${post.title.rendered}">`;
            }
        }

        postElement.innerHTML = `
            <h2><a href="${postUrl}"></h2>
        ${mediaHtml}
        <h2>${post.title.rendered}</h2>
        <div>${post.excerpt.rendered}</div>
    </a>
        `;

        postsContainer.appendChild(postElement);
    }
}


function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        displayPosts();
    }
}

function nextPage() {
    if ((currentPage + 1) * postsPerPage < posts.length) {
        currentPage++;
        displayPosts();
    }
}

document.getElementById('prev').addEventListener('click', prevPage);
document.getElementById('next').addEventListener('click', nextPage);

fetchPosts();
