const form = document.querySelector('#registration')
const successMessage = document.querySelector('#success-message')


if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        
        const data = {
            firstName: document.getElementById('firstName').value || undefined,
            lastName: document.getElementById('lastName').value || undefined,
            email: document.getElementById('email').value || undefined,
            password: document.getElementById('password').value || undefined,
        }
        document.querySelectorAll('.error').forEach(span => {
            span.textContent = ''
        })
        successMessage.textContent = ''


        try {

            const response = await axios.post('/users/registration', data)
            const infoMessage = response.data.message

            if (infoMessage) {
                successMessage.textContent = response.data.message;

                setTimeout(() => {
                    location.href = '/users/login'
                },1000)
            }else {
                console.log('No message in response.')
            }
        }catch(error) {
            const fields = error.response.data.fields
            if (fields) {
                Object.keys(fields).forEach(key => {
                    const messages = fields[key];
                    const errorSpan = document.querySelector(`#${key}-error`);
                    if (errorSpan) {
                        errorSpan.textContent = Array.isArray(messages) ? messages.join(', ') : messages;
                    } else {
                        console.warn(`No error span found for key: ${key}`);
                    }
                });
            } else {
                console.error('Error without response:', error?.message || 'Unknown error');
            }
        }

        
    })
}