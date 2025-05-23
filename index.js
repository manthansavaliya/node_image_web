require('dotenv').config();
const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();
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
