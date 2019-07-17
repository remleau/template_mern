const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // check header for the token
    var token = req.cookies['token'];

    // decode token
    if (token) {

        // verifies secret and checks if the token is expired
        jwt.verify(token, process.env.JWT_SECRET , (err, decoded) =>{      
            if (err) {
                res.json({ message: 'Le token à expiré.' });    
            } else {
                // if everything is good, save to request for use in other routes
                next();
            }
        });

    } else {

        // if there is no token  
        res.send({ 
            message: 'Aucun token valide trouvé.' 
        });

    }
    
};