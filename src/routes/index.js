const express = require("express");

const router = express.Router();

// Controller
const { getUsers, deleteUser, updateProfile } = require("../controllers/user");
const { register, login, checkAuth } = require("../controllers/auth");
const {
  getCountries,
  getCountry,
  addCountry,
  editCountry,
  deleteCountry,
} = require("../controllers/country");
const {
  getTrips,
  getTrip,
  addTrip,
  deleteTrip,
  editTrip,
} = require("../controllers/trip");

// midleware
const { auth, admin } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");
const {
  getTransactions,
  getTransaction,
  addTransaction,
  editTransaction,
  editStatus,
  getTransactionId,
} = require("../controllers/transaction");

// user
router.get("/users", auth, admin, getUsers);
router.delete("/user/:id", auth, admin, deleteUser);
router.patch("/user", auth, uploadFile("profile"), updateProfile);
// country
router.post("/country", auth, admin, addCountry);
router.get("/country/:id", getCountry);
router.patch("/country/:id", auth, admin, editCountry);
router.delete("/country/:id", auth, admin, deleteCountry);
router.get("/countries", getCountries);
// trip
router.get("/trips", getTrips);
router.get("/trip/:id", getTrip);
router.post("/trip", auth, admin, uploadFile("image"), addTrip);
router.patch("/trip/:id", auth, admin, uploadFile("image"), editTrip);
router.delete("/trip/:id", auth, admin, deleteTrip);
// transaction
router.get("/transactions", auth, admin, getTransactions);
router.get("/transaction", auth, getTransaction);
router.get("/transaction/:id", auth, getTransactionId);
router.post("/transaction", auth, addTransaction);
router.patch("/transactionAdmin/:id", auth, admin, editStatus);
router.patch(
  "/transaction/:id",
  auth,
  uploadFile("attachment"),
  editTransaction
);

// auth
router.post("/login", login);
router.post("/register", register);
router.get("/checkAuth", auth, checkAuth);
module.exports = router;
