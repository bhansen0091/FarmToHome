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
                    req.body.role = 'admin';
                    User.create(req.body)
                        .then(data => {
                            res.cookie("usertoken", jwt.sign({ id: data._id }, process.env.JWT_KEY), {
                                httpOnly: true,
                                expires: new Date(Date.now() + 7200)
                            }).json({
                                message: "Admin creation successful.",
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
            .then(data => {
                if (data === null) {
                    res.json({ error: "Invalid login attempt." })
                } else {
                    bcrypt.compare(req.body.password, data.password)
                        .then(isValid => {
                            if (isValid === true && data.role === "admin") {
                                const token = jwt.sign({ id: data._id, role: data.role }, process.env.JWT_KEY);
                                res.cookie("usertoken", token, {
                                    httpOnly: true,
                                    // expires: new Date(Date.now() + 7200)
                                }).json({
                                    message: "Admin login successful.",
                                    token: token,
                                    user: {
                                        _id: data._id,
                                        firstName: data.firstName,
                                        lastName: data.lastName,
                                        email: data.email,
                                        role: data.role
                                    }
                                })
                            } else {
                                return res.status(400).json({
                                    message: "Invalid email or password"
                                })
                            }
                        })
                        .catch(err => res.status(400).json(err))
                }
            })
            .catch(err => res.json({ error: "That email does not exist." }))
    },

    logout: (req, res) => {
        res.clearCookie("usertoken");
        res.status(200).json({ message: "Admin logged out." });
    }
}