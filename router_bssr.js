const express = require("express");
const router_bssr = express.Router();
const ShoppController = require("./controllers/ShoppController");
const productController = require("./controllers/productController");
/****************************
 *         BSSR EJS        *
 ***************************/

router_bssr.get("/", ShoppController.home);

router_bssr
  .get("/signup", ShoppController.getSignupMyShopping)
  .post("/signup", ShoppController.signupProcess);

router_bssr
  .get("/login", ShoppController.getLoginMyShopping)
  .post("/login", ShoppController.loginProcess);

router_bssr.get("/logout", ShoppController.logout);

router_bssr.get("/check-me", ShoppController.checkSessions);

router_bssr.get("/products/menu", ShoppController.getMyShoppData);
router_bssr.post(
  "/products/create",
  ShoppController.validateAuthRestaurant,
  productController.addNewProduct
);
router_bssr.post("/products/edit/:id", productController.updateChoosenProduct);
module.exports = router_bssr;
