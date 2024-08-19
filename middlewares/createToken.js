import CryptoJS from 'crypto-js';

function createToken(email, id) {
    const token = {
        email: email,
        id:id
    }
    const secret = process.env.SECRET_FOR_TOKEN
    return CryptoJS.AES.encrypt(JSON.stringify(token), secret).toString()

}
export default createToken