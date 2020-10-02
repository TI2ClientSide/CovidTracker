// import dependencies and initialize the express router
const express = require ('express');
const InfetadosController = require ('../controllers/infetados-controller');

//const router = express.Router ();
const router = require('express').Router();

const authorize = require("../configs/authorization");
const roles = require("../helpers/roles.js");

// Define routes para as operações de crude 
router.get ('/local',InfetadosController.getInfetadosLocal);
router.get ('',InfetadosController.getInfetados);
router.get ('/:id',InfetadosController.getInfetado);
router.post ('/',authorize(roles.Admin,roles.Funcionario) ,InfetadosController.postInfetado);
router.put ('/:id',authorize(roles.Admin,roles.Funcionario) ,InfetadosController.putInfetado);
router.delete ('/:id', authorize(roles.Admin,roles.Funcionario),InfetadosController.deleteInfetado);

module.exports = router;
