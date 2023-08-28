const {Router}=require('express');
const user=require("../repo/user.repo");
const tokenGenerator = require('../utils/tokenGenerator.util');
const userData = require('../controller/userData.controller');
const logoutUser = require('../controller/logoutUser.controller');
const routes=Router();
routes.post("/",user,tokenGenerator,userData);
routes.get("/logout",logoutUser);
module.exports=routes;