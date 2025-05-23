const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
}, {
    timestamps: true,
}
);

const Source = mongoose.model('Source', sourceSchema);

module.exports = Source;