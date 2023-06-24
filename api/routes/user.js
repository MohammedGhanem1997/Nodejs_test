const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const isAdmin = require('../middleware/is-admin');
const AuthController = require("../controllers/AuthController");
const UserController  = require("../controllers/UserController");
 const upload=require('../middleware/upload')
// Handle incoming requests from /users

router.post("/login", AuthController.login_user);

router.post("/",checkAuth,isAdmin,upload.single('userImage'), UserController.create_user);
router.get("/", checkAuth,isAdmin,UserController.get_all_users);
router.get("/:userId", checkAuth,isAdmin,UserController.get_specific_user);
router.patch("/:userId", checkAuth, UserController.update_user);
router.delete("/:userId", checkAuth, UserController.delete_user);

module.exports = router;