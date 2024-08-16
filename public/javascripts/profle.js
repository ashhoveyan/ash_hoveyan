const usersProfile = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
        alert('No token found. Please login first.')
        location.href = '/users/login'
        return
    }

    try {
        const response = await axios.get('/users/getUserProfile', {
            headers: {
                'x-token': token,
            },
        })

        const user = response.data.user
        const profileData = document.querySelector('#profile-data')

        if (user) {
            profileData.innerHTML = `
            <h2>${user.first_name} ${user.last_name}</h2>
            <p>Email: ${user.email}</p>
            <p>Joined: ${new Date(user.db).toLocaleDateString()}</p>
            <p>ID: ${user.id}</p>
        `
        } else {
            profileData.innerHTML = '<p class="error">Profile data not found.</p>'
        }
    } catch (error) {
        console.error(error)
        profileData.innerHTML =
            '<p class="error">Failed to load profile. Please try again later.</p>'
    }
}

usersProfile()