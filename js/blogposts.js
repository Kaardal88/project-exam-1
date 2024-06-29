import { api } from "./api/api.js";
import { blogPostElement } from "./constants/constants.js";
import { mediaApi } from "./api/api.js";

async function getPosts() {
    try {
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error('Oops! There was an error.');
        }
        const posts = await response.json(); 
        createHTML(posts);
    } catch (error) {
        console.log(error);
        if (blogPostElement) {
            const errorDiv = document.createElement('div');
            errorDiv.textContent = `Error: ${error.message}`;
            errorDiv.style.color = 'red'; 
            blogPostElement.appendChild(errorDiv);
        }
    }
}

async function getThumbnail(mediaId) {
    try {
        const response = await fetch(`${mediaApi}/${mediaId}`);
        if (!response.ok) {
            throw new Error('Error fetching thumbnail');
        }
        const media = await response.json();
        return media.source_url; // Adjust this according to your API response
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function createHTML(posts) {
    blogPostElement.className = "posts-content";
    for (const post of posts) {
        const thumbnailUrl = await getThumbnail(post.featured_media);
        const div = document.createElement('div');
        div.innerHTML = `<div>
                            <h3>
                                <a href="/blogspecific.html?id=${post.id}&title=${post.title}">
                                    ${post.title.rendered}
                                </a>
                            </h3>
                            <img src="${thumbnailUrl}" alt="Thumbnail">
                            <p class="blogpost-infotext">${post.excerpt.rendered}</p>
                        </div>`;
        blogPostElement.appendChild(div);
    }
}

getPosts();


