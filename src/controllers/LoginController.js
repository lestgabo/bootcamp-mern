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
                return res.status(200).json({ message: 'User not found. Do you want to register instead?' });
            }

            if (user && (await bcrypt.compare(password, user.password))) {
                const userResponse = {
                    _id: user.id,
                };
            }
        } catch (error) {}
    },
};
