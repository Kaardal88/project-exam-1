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

function displayPostList(posts) {
    const postListContainer = document.getElementById('post');
    postListContainer.innerHTML = '';

    posts.forEach(post => {
        const postLink = document.createElement('a');
        const newUrl = `?id=${post.id}&title=${encodeURIComponent(post.title.rendered)}`;
        postLink.href = newUrl;
        postLink.innerHTML = post.title.rendered;

        postLink.addEventListener('click', (event) => {
            event.preventDefault();
            window.history.pushState({ id: post.id, title: post.title.rendered }, '', newUrl);
            fetchPost(post.id);
        });

        const postItem = document.createElement('div');
        postItem.appendChild(postLink);
        postListContainer.appendChild(postItem);
    });
}

async function fetchPosts() {
    try {
        const response = await fetch(api);
        if (!response.ok) throw new Error('Network response was not ok');
        const posts = await response.json();
        displayPostList(posts);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');
const postTitle = urlParams.get('title');

if (postId && postTitle) {
    fetchPost(postId, postTitle);
} else {
    fetchPosts();
}

window.addEventListener('popstate', (event) => {
    const postId = event.state ? event.state.id : null;
    const postTitle = event.state ? event.state.title : null;
    if (postId && postTitle) {
        fetchPost(postId, postTitle);
    } else {
        console.log('No postId found in state');
    }
});
