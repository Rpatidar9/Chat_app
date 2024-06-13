const jsonwebtoken = require('jsonwebtoken');
const SECRET_KEY = 'your_chat_app';

async function verifyToken(req, res, next) {
    var token = req.headers.authorization;
    if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1];
        try {
            const verified = jsonwebtoken.verify(token, SECRET_KEY);
            req.user = verified;
            next();
        }
        catch (error) {
            return res.status(401).json({
                message: 'Token is not valid'
            })
        }
    }
}
module.exports = {
    verifyToken
}