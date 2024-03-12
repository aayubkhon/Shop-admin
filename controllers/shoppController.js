const Member = require("../models/Member");

let ShoppController = module.exports;

ShoppController.getMyShoppData = async (req, res) => {
  try {
    console.log("GET: cont/getMyShoppData");
    // TODO Get my restaurant products
    res.render("shopp-menu");
  } catch (err) {
    console.log(`ERROR, cont/getMyShoppData, ${err.message} `);
    res.json({ state: "fail", message: err.message });
  }
};
ShoppController.getSignupMyShopping = async (req, res) => {
  try {
    console.log("GET: cont/getSignupMyShopping");
    res.render("signup");
  } catch (err) {
    console.log(`ERROR, cont/getSignupMyShopping, ${err.message} `);
    res.json({ state: "fail", message: err.message });
  }
};
/****************************************
 *     BSSR RELEATED METHODS       *
 ****************************************/

ShoppController.home = (req, res) => {
  try {
    console.log("GET: cont/home");
    res.render("home-page");
  } catch (err) {
    console.log(`ERROR, cont/home, ${err.message} `);
    res.json({ state: "fail", message: err.message });
  }
};

ShoppController.signupProcess = async (req, res) => {
  try {
    console.log("POST: cont/signupProcess");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupDate(data);
    req.session.member = new_member;
    res.redirect("/shopp/products/menu");
  } catch (err) {
    console.log(`ERROR: cont/signupProcess,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

ShoppController.getLoginMyShopping = async (req, res) => {
  try {
    console.log("GET: cont/getLoginMyShopping");
    res.render("login-page");
  } catch (err) {
    console.log(`ERROR, cont/getLoginMyShopping, ${err.message} `);
    res.json({ state: "fail", message: err.message });
  }
};

ShoppController.loginProcess = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);
    req.session.member = result;
    req.session.save(function () {
      res.redirect("/shopp/products/menu");
    });
  } catch (err) {
    res.json({ state: "fail", message: err.message });
    console.log(`ERROR, cont/login, ${err.message} `);
  }
};

ShoppController.logout = (req, res) => {
  console.log("GET cont.logout");
  res.send("we are in logout page");
};

ShoppController.validateAuthShopp = (req, res, next) => {
  if (req.session?.member?.mb_type === "SHOPP") {
    req.member = req.session.member;
    next();
  } else
    res.json({
      state: "fail",
      message: "only authinticated members with shopp type",
    });
};

ShoppController.checkSessions = (req, res) => {
  if (req.session?.member) {
    res.json({ state: "success", data: req.session.member });
  } else {
    res.json({ state: "fail", message: "You ara not authenticated" });
  }
};
