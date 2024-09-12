import { getLatestPost } from "./api/api.js";
import { mediaApi } from "./api/api.js";
import { newbornSection } from "./constants/constants.js";
import { errorElement } from "./constants/error.js";

async function newbornArticle() {
    try {
        const post = await getLatestPost();
        createHTML(post);
    } catch (error) {
        console.error('Fetch error:', error);
        errorElement.classList.add('errorVisible');
        errorElement.innerHTML = 'Ooops! Something went wrong. Try again later :)';
    }
}

async function getThumbnail(mediaId) {
    try {
        const response = await fetch(`${mediaApi}/${mediaId}`);
        if (!response.ok) {
            throw new Error('Error fetching thumbnail');
        }
        const media = await response.json();
        return media.guid.rendered;
    } catch (error) {
        console.error('Fetch error:', error);
        errorElement.classList.add('errorVisible');
        errorElement.innerHTML = 'Ooops! Something went wrong. Try again later :)';
    }
}

async function createHTML(post) {
    newbornSection.classList = "news-text";
    newbornSection.innerHTML = '';
    await appendPostToSection(post);
}


function contentBuilder(post, showAll) {
    if (showAll === true) {
        return post.content.rendered;
    } else {
        return post.content.rendered.split('</p>')[0] + '...</p>';
    }
}

async function appendPostToSection(post) {

    const titleElement = document.createElement('h2');


    const bodyElement = document.createElement('p');
    bodyElement.textContent = post.body;
    newbornSection.appendChild(bodyElement);

    const thumbnailUrl = await getThumbnail(post.featured_media);
    let showAllContent = false;

    const div = document.createElement('div');
    div.innerHTML = `
        <div>
            <h3>
                <a href="/blog.html?id=${post.id}&title">
                    ${post.title.rendered}
                </a>
            </h3>
            <img src="${thumbnailUrl}" alt="Thumbnail">
            <div class="news-text">${contentBuilder(post, showAllContent)}</div>
        </div>
    `;



    const button = document.createElement('button');
    button.textContent = 'Read More';

    button.classList.add('read-more-button');

    button.onclick = function () {
        showAllContent = !showAllContent;

        if (showAllContent) {
            button.textContent = 'Read Less';
        } else {
            button.textContent = 'Read More';
        }

        div.innerHTML = `
    <div>
        <h3>
            <a href="/blog.html?id=${post.id}&title=${encodeURIComponent(post.title)}">
                ${post.title.rendered}
            </a>
        </h3>
        <img src="${thumbnailUrl}" alt="Thumbnail">
        
        <div class="news-text">${contentBuilder(post, showAllContent)}</div>
    </div>
    `;
        div.appendChild(button);
    };

    div.appendChild(button);
    newbornSection.appendChild(titleElement);
    newbornSection.appendChild(div);

}



newbornArticle();
