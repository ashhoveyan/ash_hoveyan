const form = document.querySelector('#task-form')

form.addEventListener('submit', async event => {
    event.preventDefault()

    const data = {
        title: document.querySelector('#title').value,
        description: document.querySelector('#description').value,
    }
    const message = document.querySelector('#message')
    const token = localStorage.getItem('token')

    if (!token) {
        alert('No token found. Please login first.')
        location.href = '/users/login'
        return
    }

    try {
        const response = await axios.post('/post/createPost', data, {
            headers: { 'x-token': token },
        })

        if (response.data.task) {
            message.textContent = 'Task created successfully!'
            setTimeout(() => {
                location.href = '/users/profile'
                message.textContent = ''
            }, 3000)
        } else {
            message.textContent = 'Failed to create task.'
            message.className = 'error'
        }
    } catch (error) {
        console.error('Error creating task:', error)
        message.textContent = 'Error creating task.'
        message.className = 'error'
    }
})