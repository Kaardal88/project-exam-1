import { api } from "./api/api.js";
/* import { mediaApi } from "./api/api.js"; */

document.getElementById("search-button").addEventListener("click", function () {
    const query = document.getElementById("search-blogs").value.trim();
    if (query) {
        searchBlogs(query);
    }
});

async function searchBlogs(query) {
    try {
        const response = await api.get(`/blogs?search=${encodeURIComponent(query)}`);
        const blogs = response.data; // Forutsetter at data er formatet på API-svaret
        displayBlogs(blogs);
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
}

function displayBlogs(blogs) {
    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = ""; // Fjerner tidligere søkeresultater

    if (blogs.length === 0) {
        blogContainer.innerHTML = "<p>No results found.</p>";
        return;
    }

    blogs.forEach(blog => {
        const blogElement = document.createElement("div");
        blogElement.className = "blog-post";
        blogElement.innerHTML = `
            <h2>${blog.title}</h2>
            <p>${blog.description}</p>
        `;
        blogContainer.appendChild(blogElement);
    });
}
