console.log("Web server is Started");
const express = require("express");
const app = express();
const router = require("./router");
const router_bssr = require("./router_bssr");
const cookieParser = require("cookie-parser");
const cors = require("cors");

let session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URL,
  collection: "session",
});

// 1 kirish codelar
app.use(express.static("public"));
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());

// 2 Sesseion code
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1000 * 60 * 30, // for 30minutes
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(function (req, res, next) {
  res.locals.member = req.session.member;
  next();
});
// 3 Views code
app.set("views", "views");
app.set("view engine", "ejs");

// 4 Routing coded
app.use("/shopp", router_bssr); 
app.use("/", router); 

module.exports = app;
