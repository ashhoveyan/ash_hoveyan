const token = localStorage.getItem('token');
const errorMessage = document.getElementById('error-message');
const postsContainer = document.getElementById('posts-container'); // Define the container for posts

const getPost = async () => {
    if (!token) {
        errorMessage.textContent = 'No token found. Please log in.';
        return;
    }

    try {
        const response = await axios.get('/posts', {
            headers: { 'x-token': token },
        });

        if (response.data.status === 'success') {
            const posts = response.data.posts;

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');

                postElement.innerHTML = `
                    <p class="post-author">Post ID: ${post.id}</p>
                    <p class="post-author">User ID: ${post.userId}</p>
                    <h2 class="post-title">Title: ${post.title}</h2>
                    <p class="post-description">Description: ${post.description}</p>
                    <p class="post-created">Post created: <br>${post.createdAt}</p>
                `;

                postsContainer.appendChild(postElement);
            });
        } else {
            errorMessage.textContent = 'Failed to load posts.';
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        errorMessage.textContent = 'An error occurred while fetching posts.';
    }
}

getPost();
