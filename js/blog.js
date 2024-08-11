import { api } from "./api/api.js";

async function fetchPost(postId) {
    try {
        const response = await fetch(`${api}/${postId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const post = await response.json();
        console.log('Fetched post:', post); // Log API response for debugging
        displayPost(post);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayPost(post) {
    if (!post || !post.title || !post.content) {
        console.error('Invalid post data:', post);
        return;
    }
    const postContainer = document.getElementById('post');
    postContainer.innerHTML = `
        <h1>${post.title.rendered}</h1>
        <img src="${post.featured_media_url || 'default-image.jpg'}" alt="${post.title.rendered}">
        <div>${post.content.rendered}</div>
    `;
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
console.log('Post ID:', postId); // Log the post ID for debugging
if (postId) {
    fetchPost(postId);
}
