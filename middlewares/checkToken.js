import CryptoJS from 'crypto-js'

const checkToken = async (req, res, next) => {
    const token = await req.headers['x-token']
    console.log('Token received by server:', token)

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const bytes = CryptoJS.AES.decrypt(token, process.env.SECRET_FOR_TOKEN)
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8)

        if (!decryptedData) {
            throw new Error('Failed to decrypt token')
        }

        req.user = JSON.parse(decryptedData)
        next()
    } catch (error) {
        console.error('Token verification error:', error.message)
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

export default checkToken