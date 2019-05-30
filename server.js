const bodyParser =  require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbconnect = require('./config/db');
const fs = require('fs');
const helmet = require('helmet');



const app = express();
app.use(cors());
app.use(bodyParser());
app.use(helmet());

dbconnect();


app.use(morgan("combined"));
app.use(morgan('combined', {stream: fs.createWriteStream('./access.log', {flags: 'a'})}));


const PORT = process.env.PORT || 3000;


app.get("/", (req, resp) => {
  resp.json({ status: "server active" });
});

app.use('/api/users', require("./api/users"));
app.use('/api/auth', require("./api/auth"));
app.use('/api/posts', require("./api/post"));
app.use('/api/profiles', require("./api/profile"));


app.listen(PORT, () => {
  console.log("Server listening");
});