const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const routes = require('./routes');

const PORT = process.env.port || 8000;

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

app.use(cors());
app.use(express.json());
app.use(routes);

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('MongoDB connected!');
} catch (error) {
    console.log(error);
}

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
