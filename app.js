console.log("Web server is Started");
const express = require("express");
const app = express();
const router = require("./router");


let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "session",
});

// 1 open code
app.use(express.static("public"));


// 2 Sesseion code

// 3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing coded
app.use("/", router); 

module.exports = app;
