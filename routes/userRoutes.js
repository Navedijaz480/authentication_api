const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
router.post("/sign_up", userController.userSignUp);
router.post("/login", userController.userLogin);
router.post("/all", userController.getAllUser);
router.route("/:id")
.get( userController.getUserById)
.put(userController.updateUserById)

module.exports = router;
   