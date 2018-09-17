const express = require('express');
const path  = require('path');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

// database
const db = require('./models');

// router
const router = require('./routes/router');

const app = express();

// parse requests of content-type - application/x-www-form-urlencoded and handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// static directory
app.use(express.static(path.join(__dirname, 'public')));

// use the api
router(app, db);

// sync database and then run the server
try {
    db.sequelize.sync().then(async () => {
        app.listen(port, () => console.log(`Server running on port ${port}`));
    });
} catch (e) {
    console.log(e);
}




