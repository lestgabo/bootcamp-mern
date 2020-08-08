const Event = require('../models/Event');

module.exports = {
    async getAllEvents(req, res) {
        const { sport } = req.params;
        let query = {};

        if (sport) query = { sport };
        try {
            const events = await Event.find(query);

            if (events) {
                return res.json(events);
            }
        } catch (error) {
            return res.status(400).json({ message: `We don't have any ${sport} events yet!` });
        }
    },
};
