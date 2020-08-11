const Registration = require('../models/Registration');

module.exports = {
    async create(req, res) {
        const { user_id } = req.headers;
        const { eventId } = req.params;
        const { date } = req.body;

        if (!eventId) {
            return res.status(400).json({ message: 'Event does not exists!' });
        } else if (!user_id) {
            return res.status(400).json({ message: 'User does not exists!' });
        }

        const registration = await Registration.create({
            user: user_id,
            event: eventId,
            date,
        });

        await registration.populate('event').populate('user', '-password').execPopulate();

        return res.json(registration);
    },

    async getRegistrationById(req, res) {
        const { registrationId } = req.params;

        try {
            const registration = await Registration.findById(registrationId);

            if (registration) {
                await registration.populate('event').populate({ path: 'user', select: '-password -email' }).execPopulate();
                return res.json(registration);
            } else {
                return res.status(400).json({ message: 'Registration does not exists!' });
            }
        } catch (error) {
            return res.status(400).json({ message: 'Registration does not exists!' });
        }
    },
};
