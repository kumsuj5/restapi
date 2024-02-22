const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'this is dummy text'); 
        req.userData = { userId: decodedToken.userId };
        if(decodedToken.userType == 'admin'){
            next();
        }
        else{
            return res.status(401).json({
                msg:'not admin'
            })
        }
        // next();
    } catch (err) {
        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
}
