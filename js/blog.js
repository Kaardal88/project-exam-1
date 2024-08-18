import { api } from "./api/api.js";
import { mediaApi } from "./api/api.js";

async function fetchPost(postId) {
    try {
        const response = await fetch(`${api}/${postId}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const post = await response.json();


        if (post.featured_media) {
            const mediaResponse = await fetch(`${mediaApi}/${post.featured_media}`);
            if (!mediaResponse.ok) throw new Error('Media fetch was not ok');
            const media = await mediaResponse.json();



            post.imageUrl = media.source_url;
        }

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

    postContainer.innerHTML = '';

    if (post.imageUrl) {
        const imageElement = document.createElement('img');
        imageElement.src = post.imageUrl;
        imageElement.alt = post.title.rendered;
        postContainer.appendChild(imageElement);
    }


    const titleElement = document.createElement('h1');
    titleElement.innerHTML = post.title.rendered;
    postContainer.appendChild(titleElement);


    const contentElement = document.createElement('div');
    contentElement.innerHTML = post.content.rendered;
    postContainer.appendChild(contentElement);
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
if (postId) {
    fetchPost(postId);
}
