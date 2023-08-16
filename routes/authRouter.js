const { loginUser, registerUser, foundUser } = require("../controller/authController");

const router = require("express").Router();
const auth = require('../middleware/auth')


router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", auth, foundUser)
module.exports = router