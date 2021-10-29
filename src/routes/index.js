const express = require("express");

const router = express.Router();

// Controller
const { getUsers, deleteUser } = require("../controllers/user");

// Route
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);


module.exports = router;
