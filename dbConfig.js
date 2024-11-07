const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      "mongodb+srv://Tahaali:mongotaha1214@users.c4f1l.mongodb.net/?retryWrites=true&w=majority&appName=Users")
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => {
      console.log("Error in DB connection", err);
    });
};
