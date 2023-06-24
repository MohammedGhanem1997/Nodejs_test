const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (decoded.type=="admin") {
            console.log(decoded);
            console.log("type=admin");
            next();
        } else{

       

        return res.status(401).json({
            message: ' you do not have access ',
            status:"ERROR"
        });
    }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth verification failed you are not admin so you do not have access ',
            status:"ERROR"
        });
    }
};