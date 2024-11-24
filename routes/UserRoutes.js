"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userValidations_1 = require("../middlewares/userValidations");
const handleValidation_1 = require("../middlewares/handleValidation");
const UserController_1 = require("../controllers/UserController");
const authGuard_1 = require("../middlewares/authGuard");
const router = (0, express_1.Router)();
// Registro de usuário
router.post("/register", (0, userValidations_1.userCreateValidation)(), handleValidation_1.validate, UserController_1.registerUser);
// Login de usuário
router.post("/login", (0, userValidations_1.userLoginValidation)(), handleValidation_1.validate, UserController_1.loginUser);
// Atualização de perfil (requer autenticação)
router.put("/profile", authGuard_1.authGuard, UserController_1.updateUser);
router.get("/verify-token", UserController_1.verifyToken);
exports.default = router;
