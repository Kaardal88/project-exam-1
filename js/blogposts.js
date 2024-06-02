import { api } from "./api/api.js";
import { blogPostElement } from "./constants/constants.js";

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

function createHTML(posts) {
    posts.forEach(function(post) {
        const div = document.createElement('div');
        blogPostElement.className = "posts-content";
        div.innerHTML = `<div>
                            <h3>
                                <a href="/blogspecific.html?id=${post.id}&title=${post.title.rendered}"> 
                                <p class="blogpost-infotext">${post.title.rendered}</p>
                                </a>
                            </h3>
                        </div>`;
        blogPostElement.appendChild(div); 
    });
}

getPosts();



