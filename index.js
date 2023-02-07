const express = require("express");
const app = express();
const session = require("express-session");

const sessionOption = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
};

app.use(session(sessionOption));

app.get("/viewcount", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`Yout have viewed this page ${req.session.count} times`);
});

app.get("/register", (req, res) => {
  const { username = "Anonymous" } = req.query;
  req.session.username = username;
  res.redirect("/greet");
});

app.get("/greet", (req, res) => {
  const { username } = req.session;
  res.send(`Welcome Back ${username}`);
});

app.listen(3002, () => {
  console.log("Open 3002 server");
});
