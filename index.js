require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router');
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static('uploads'));

app.use('/', router);

app.listen(process.env.PORT, () => {
    require('./db/db.js');
    console.log(`Server is running on port ${process.env.PORT}`);
});
