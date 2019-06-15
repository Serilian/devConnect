const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dbconnect = require("./config/db");
const fs = require("fs");
const helmet = require("helmet");
const path = require("path");


const app = express();
app.use(cors());
app.use(bodyParser());
app.use(helmet());

dbconnect();

app.use(morgan("combined"));
app.use(morgan("combined", { stream: fs.createWriteStream("./access.log", { flags: "a" }) }));

const PORT = process.env.PORT || 5000;

app.use("/api/users", require("./api/users"));
app.use("/api/auth", require("./api/auth"));
app.use("/api/posts", require("./api/post"));
app.use("/api/profiles", require("./api/profile"));

//serve static assets for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
  console.log("Server listening");
});

