require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./configs/mongoDb');
const cors = require('cors');

const app = express();
app.use(cors());
const port = process.env.PORT || 4001;
app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', require("./routes/v1/index"));

db.connection()
    .then(() => {
        console.log("DB connected successfully")
        app.listen(port, () => {
            console.log(`app listening on port ${port}`);
        })
    })
    .catch((err) => {
        console.log(err)
    });
