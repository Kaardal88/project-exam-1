 export const api = "https://kimkar88.no/wp-json/wp/v2/posts";
 export const mediaApi = "https://www.kimkar88.no/wp-json/wp/v2/media";


export async function getAllPublishedPosts() {
    const response = await fetch(api);
    if (response.ok) {
        let posts = await response.json();
        return posts.filter(post => post.status === "publish");
    } else{
        throw new Error("Error fetching posts");
    }
}


 export async function getLatestPost() {
    const posts = await getAllPublishedPosts();
        if (posts.length > 0) {
            posts.sort(function(a,b){
                return new Date(b.date) - new Date(a.date);
              });
              
            return posts[0];
        }
    
    return undefined;
 }