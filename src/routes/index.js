const express = require("express");

const router = express.Router();

// Controller
const { getUsers, deleteUser } = require("../controllers/user");
const { register,login } = require("../controllers/auth");

// Route
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);

router.post("/login", login)
router.post("/register", register);
module.exports = router;
