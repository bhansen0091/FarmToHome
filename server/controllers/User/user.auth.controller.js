const { User } = require('../../models/user.model'),
    jwt = require('jsonwebtoken'),
    bcrypt = require('bcrypt');

module.exports = {
    register: (req, res) => {
        User.findOne({ email: req.body.email })
            .exec((error, user) => {
                if (user) {
                    return (res.status(400).json({
                        error: 'Email already registered, please use a different email address.'
                    }));
                } else {
                    User.create(req.body)
                        .then(data => {
                            res.cookie("usertoken", jwt.sign({ id: data._id }, process.env.JWT_KEY), {
                                httpOnly: true,
                                expires: new Date(Date.now() + 90000000000)
                            }).json({
                                message: "User registration successful.",
                                user: {
                                    _id: data._id,
                                    firstName: data.firstName,
                                    lastName: data.lastName,
                                    email: data.email,
                                    role: data.role
                                }
                            })
                        })
                        .catch(err => res.json(err.errors))
                }
            })
    },

    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    res.json({ error: "Invalid login attempt." })
                } else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(isValid => {
                            if (isValid === true && user.role === "user") {
                                const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_KEY)
                                res.cookie("usertoken", token, {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 90000000000)
                                }).json({
                                    message: "User login successful.",
                                    // token: token,
                                    user: {
                                        _id: user._id,
                                        firstName: user.firstName,
                                        lastName: user.lastName,
                                        email: user.email,
                                        role: user.role
                                    }
                                })
                            } else {
                                return res.status(400).json({
                                    message: "Invalid email or password"
                                })
                            }
                        })
                        .catch(err => res.json({ error: "Invalid login attempt." }))
                }
            })
            .catch(err => res.json({ error: "Invalid login attempt." }))
    },
    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.status(200).json({ message: "User logged out." });
    }
}