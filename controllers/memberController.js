const Member = require("../models/Member");

const jwt = require("jsonwebtoken");
const assert = require("assert");
const Definer = require("../lib/mistake");

let memberController = module.exports;

memberController.signup = async (req, res) => {
  try {
    console.log("POST: cont/signup");
    const data = req.body,
      member = new Member(),
      new_member = await member.signupDate(data);

    // TODO AUTHENTICATE BASED ON JWT
    const token = memberController.createTooken(new_member);

    res.cookie("accsess_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: false,
    });

    res.json({ state: "success", data: new_member });
  } catch (err) {
    console.log(`ERROR: cont/signup,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.login = async (req, res) => {
  try {
    console.log("POST: cont/login");
    const data = req.body,
      member = new Member(),
      result = await member.loginData(data);

    // TODO AUTHENTICATE BASED ON JWT

    const token = memberController.createTooken(result);

    res.cookie("access_token", token, {
      maxAge: 6 * 3600 * 1000,
      httpOnly: false,
    });

    res.json({ state: "success", data: result });
  } catch (err) {
    console.log(`ERROR: cont/login,${err.message}`);
    res.json({ state: "fail", message: err.message });
  }
};

memberController.logout = (req, res) => {
  console.log("GET cont/logout");
  res.cookie("access_token", null, { maxAge: 0, httpOnly: true });
  res.json({ state: "success", data: "logout_successfully" });
};

memberController.createTooken = (result) => {
  try {
    const upload_data = {
      _id: result._id,
      mb_nick: result.mb_nick,
      mb_type: result.mb_type,
    };
    const token = jwt.sign(upload_data, process.env.SECRET_TOKEN, {
      expiresIn: "6h",
    });
    assert.ok(token, Definer.auth_err4);
    return token;
  } catch (err) {
    throw err;
  }
};
