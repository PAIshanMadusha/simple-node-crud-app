//Imports
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 4000;

//Db Connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the Database!"));

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false,
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    req.session.message = null;
    next();
});

app.use(express.static('uploads'));

//Set Templete Engine
app.set('view engine', 'ejs');

//Route
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});