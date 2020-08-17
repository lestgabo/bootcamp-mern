const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(200).json({ message: 'Required field missing.' });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(200).json({ message: 'Email or password does not match.' });
            }

            if (user && (await bcrypt.compare(password, user.password))) {
                // to be saved to the browser
                const userResponse = {
                    _id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                };
                return res.json(userResponse);
            } else {
                return res.status(200).json({ message: `Email or password does not match.` });
            }
        } catch (error) {
            throw Error(`Error while authenticating a user: ${error}`);
        }
    },
};
