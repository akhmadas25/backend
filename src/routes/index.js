const express = require("express");

const router = express.Router();

// Controller
const { getUsers, deleteUser } = require("../controllers/user");
const { register,login } = require("../controllers/auth");
const { getCountries, getCountry, addCountry, editCountry, deleteCountry } = require("../controllers/country");

// midleware
const {auth, admin} = require("../middlewares/auth")

// Route
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
router.post("/country", auth, admin, addCountry);
router.get("/country/:id", getCountry);
router.patch("/country/:id",auth, admin, editCountry);
router.delete("/country/:id", auth, admin, deleteCountry);
router.get("/countries", getCountries);

router.post("/login", login)
router.post("/register", register);
module.exports = router;
