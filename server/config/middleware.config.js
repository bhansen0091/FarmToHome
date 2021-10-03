const jwt = require('jsonwebtoken');

module.exports.userAuthenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            req.user = payload;
            next();
        }
    })
}


module.exports.adminAuthenticate = (req, res, next) => {
    jwt.verify(req.cookies.admintoken, process.env.JWT_KEY, (err, payload) => {
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            if (payload.role !== 'admin') {
                console.log(payload.role);
                return res.status(400).json({ message: 'Restricted area, you must contact an admin to view this area.' })
            }
            req.user = payload;
            next();
        }
    })
}