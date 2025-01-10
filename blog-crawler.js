import fs from 'fs';
import { pipeline } from 'stream/promises';

// Define the API URL
const getPosts = async (page = 1) => {
    const API_URL = `https://thenuschool.com/wp-json/wp/v2/posts?per_page=50&page=${page}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
        console.error(`Failed to fetch posts from the API: ${response.status} ${response.statusText}`);
        return [];
    }
    const posts = await response.json();
    console.log(`Fetched ${posts.length} posts from the API, page ${page}.`);
    return posts;
}

const downloadImage = async (url, path) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to download image from URL: ${url}, status: ${response.status}`);
        }

        // Stream the response directly to the file
        await pipeline(response.body, fs.createWriteStream(path));
        console.log(`Image downloaded successfully to ${path}`);
    } catch (error) {
        console.error(`Error downloading image: ${error.message}`);
    }
};
const getFeaturedImage = async (id) => {
    console.log(`Fetching featured image from the API for post ID: ${id}`);
    const API_URL = `https://thenuschool.com/wp-json/wp/v2/media/${id}`;
    const response = await fetch(API_URL);
    if (!response.ok) {
        console.error(`Failed to fetch featured image from the API: ${response.status} ${response.statusText}`);
        return null;
    }
    const image = await response.json();
    const imagePath = `./public/blog-images/${image.id}.jpg`;
    // await downloadImage(image.source_url, imagePath);
    console.log(`Fetched featured image from the API: ${image.source_url}`, imagePath);
    return `/oldschool/blog-images/${image.id}.jpg`;
}

(async function fetchAndGenerateMarkdown() {
    try {
        let posts = [];
        let page = 1;
        let newPosts = await getPosts(page);
        while (newPosts.length > 0) {
            posts = [...posts, ...newPosts];
            page++;
            newPosts = await getPosts(page);
        }
        console.log(`Total posts fetched: ${posts.length}`);
        
        // Ensure the output directory exists
        const outputDir = './src/content/blog';
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir);
        }

        console.log(`Fetched ${posts.length} posts from the API.`);
        // Iterate over the posts and create markdown files
        await Promise.all(posts.map(async post => {
            // Extract necessary fields
            const title = post.title.rendered;
            const description = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim(); // Remove HTML tags
            const pubDate = new Date(post.date).toDateString();
            const heroImage = await getFeaturedImage(post.featured_media);
            const content = post.content.rendered;

            // rest of json fields should be added to the astro header:
            /*const jsonFields = Object.keys(post).filter(field => {
                return ![ 'title', 'excerpt', 'date', 'featured_media', 'content', '_links'].includes(field);
            });
            const jsonFieldsAndValues = jsonFields.map(field => {
                return `${field}: ${JSON.stringify(post[field])}`;
            }).join('\n');
            
            // Construct the markdown content
            const markdownContent = [
                '---',
                `title: '${title}'`,
                `description: '${description}'`,
                `pubDate: '${pubDate}'`,
                `heroImage: '${heroImage}'`,
                jsonFieldsAndValues,
                '---',
                '',
                content
            ].join('\n');*/

            const markdownContent = [
                '---',
                JSON.stringify({
                    ...post,
                    content: undefined,
                    excerpt: undefined,
                    title,
                    description,
                    pubDate,
                    heroImage
                }, null, 2),
                '---',
                '',
                content
            ].join('\n');

            // Define the file name
            const fileName = `${outputDir}/${post.slug || `post-${post.id}`}.md`;

            // Write the markdown file
            fs.writeFileSync(fileName, markdownContent.trim());
            console.log(`Generated: ${fileName}`);
        }));

        console.log('All posts have been processed and saved.');
    } catch (error) {
        console.error('Error fetching or processing posts:', error.message);
    }
})();
