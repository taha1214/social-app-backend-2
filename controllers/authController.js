
const User = require("../models/userModel");

var passwordHash = require("password-hash");

const login = (req, res) => {
  const body = req.body;
  console.log("body", body);
  User.findOne({ email: body.email })
    .then((user) => {
      if (user) {
        const isValidPassword = passwordHash.verify(
          body.password,
          user.password
        );

        if (isValidPassword) {
          res.send({
            message: "Login successfully!!",
            user: user,
          });
        } else {
          res.send({
            message: "Invalid password please enter valid password!!",
          });
        }
      } else {
        res.status(500).send({
          message: "User not found, please signup first",
        });
      }
    })
    .catch((err) => {
      console.log("err", err);
    });
};

const singup = (req, res) => {
  const body = req.body;

  const hashedPassword = passwordHash.generate(body.password);

  const newUser = new User({
    email: body.email,
    password: hashedPassword,
    name: body.name,
    age: body.age,
  });

  newUser
    .save()
    .then((user) => {
      console.log("user", user);
      res.send({
        message: "Signup Successfully",
        user,
      });
    })
    .catch((err) => {
      console.log("err", err);
      if (err?.message?.includes("duplicate key")) {
        res.status(500).send({
          message: "User already exist please try with another email!",
        });
      } else {
        res.status(500).send({
          message: err.message,
          error: err,
        });
      }
    });
};


const updateProfile =(req, res)=> {
  const userId = req.params.userId;
  const updatedData = req.body;  // Make sure you can receive the updated data

  // Logic to update the user profile in the database
  User.findByIdAndUpdate(userId, updatedData, { new: true })
      .then(updatedUser => res.json({ user: updatedUser }))
      .catch(err => res.status(400).send({ message: "Error updating profile", err }));
};



const setNewPassword = (req, res) => {
  res.send({ message: "setNewPassword successful" });
};

module.exports = { login, singup, setNewPassword, updateProfile };
