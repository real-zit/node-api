const express = require("express");
const router = express.Router();
const UserControllers = require("../controllers/user");
const checkAuth = require("../middleware/check_auth");

router.post("/signup", UserControllers.createUser);

router.post("/login", UserControllers.loginUser);

router.delete("/:userId", checkAuth, UserControllers.deleteUser);

module.exports = router;
