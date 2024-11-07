const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
// const multer = require('multer');
const dbConnection = require("./dbConfig");

const router = require("./routes/index");

const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use(cors());

app.use(router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  dbConnection();
});
