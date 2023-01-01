const express = require("express");
const { login, register } = require("../controllers/authController");
const { getUser } = require("../controllers/userController");

const router = express.Router();

router.get("/getUser/:id", getUser );

router.post("/login", login);
router.post("/signup", register);


module.exports = router;

