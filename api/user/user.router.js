const {signup,getUser,getUserById,updateUser,deleteUser,login} = require("./user.controller");
const router = require("express").Router();
const {checkToken} = require("../../auth/token_velidation");

router.get("/",checkToken,getUser);
router.get("/:id",checkToken,getUserById);
router.patch("/",checkToken,updateUser);
router.delete("/",checkToken,deleteUser);
router.post("/signup",checkToken,signup);
router.post("/login",login);


module.exports = router; 