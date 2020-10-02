const userController = require("../controllers/user-controller");
const router = require("express").Router();
const authorize = require("../configs/authorization");
const roles = require("../helpers/roles.js");

router.post("/register", userController.register);
router.post("/login", userController.login);

router.get("/infetados", authorize(), userController.getInfetados);
router.post("/infetados/:id", authorize(), userController.addInfetados);
router.delete("/infetados/:id", authorize(), userController.removeInfetados);

router.get("",authorize(roles.Admin) ,userController.getUsers);
router.delete("/:id",authorize(roles.Admin) ,userController.deleteUser);

module.exports = router;