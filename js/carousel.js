import { api } from "./api/api.js";
import { mediaApi } from "./api/api.js";

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
    }
}

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
