const jsonwebtoken = require('jsonwebtoken');
const SECRET_KEY = 'your_chat_app';

// async function verifyToken(req, res, next) {
//     var token = req.headers.authorization;
//     if (token && token.startsWith('Bearer')) {
//         token = token.split(' ')[1];
//         try {
//             const verified = jsonwebtoken.verify(token, SECRET_KEY);
//             req.user = verified;
//             next();
//         }
//         catch (error) {
//             return res.status(401).json({
//                 message: 'Token is not valid'
//             })
//         }
//     }
// },

// const jsonwebtoken = require('jsonwebtoken');
// const SECRET_KEY = 'your-secret-key';

// Assuming cookie-parser is already configured in your app
async function verifyToken(req, res, next) {
    // First, check the Authorization header for the token
    let token = req.headers.authorization;

    if (req.cookies && req.cookies.token) {
        // If no Authorization header, check the cookies for a token
        token = req.cookies.token;
    } else if (token && token.startsWith('Bearer')) {
        token = token.split(' ')[1]; // Extract the token part
    }

    // If a token was found, attempt to verify it
    if (token) {
        try {
            const verified = jsonwebtoken.verify(token, SECRET_KEY);
            req.user = verified; // Store the verified user in the request object
            next(); // Call next to continue the request flow
        } catch (error) {
            return res.status(401).json({
                message: 'Token is not valid'
            });
        }
    } else {
        return res.status(401).json({
            message: 'No token provided'
        });
    }
};

module.exports = verifyToken;

module.exports = {
    verifyToken
}