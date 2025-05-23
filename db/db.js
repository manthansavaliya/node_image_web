const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI ?? 'mongodb://localhost:27017/image_web').then(() => {
    console.log('Database connected.');
}).catch((err) => {
    console.log(err);
});

module.exports = mongoose;
