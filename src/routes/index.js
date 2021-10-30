const express = require("express");

const router = express.Router();

// Controller
const { getUsers, deleteUser } = require("../controllers/user");
const { register,login } = require("../controllers/auth");
const { getCountries, getCountry, addCountry, editCountry, deleteCountry } = require("../controllers/country");
const { getTrips, getTrip, addTrip, deleteTrip } = require("../controllers/trip")

// midleware
const {auth, admin} = require("../middlewares/auth")
const {uploadFile} = require("../middlewares/uploadFile")

// Route
router.get("/users", getUsers);
router.delete("/user/:id", deleteUser);
// country
router.post("/country", auth, admin, addCountry);
router.get("/country/:id", getCountry);
router.patch("/country/:id",auth, admin, editCountry);
router.delete("/country/:id", auth, admin, deleteCountry);
router.get("/countries", getCountries);
// trip
router.get("/trips", getTrips);
router.get("/trip/:id", getTrip);
router.post("/trip", auth, admin, uploadFile("image"), addTrip);
router.delete("/trip", auth, admin, deleteTrip);


// auth
router.post("/login", login)
router.post("/register", register);
module.exports = router;
