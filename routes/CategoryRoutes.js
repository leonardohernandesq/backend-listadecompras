"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryValidation_1 = require("../middlewares/categoryValidation");
const handleValidation_1 = require("../middlewares/handleValidation");
const CategoryController_1 = require("../controllers/CategoryController");
const authGuard_1 = require("../middlewares/authGuard");
const router = (0, express_1.Router)();
// Criar nova categoria
router.post("/", authGuard_1.authGuard, (0, categoryValidation_1.categoryCreateValidation)(), handleValidation_1.validate, CategoryController_1.createCategory);
router.get('/:id', CategoryController_1.getCategoryById);
// Deletar uma categoria
router.delete("/:id", authGuard_1.authGuard, CategoryController_1.deleteCategory);
// Obter todas as categorias
router.get("/", authGuard_1.authGuard, CategoryController_1.getAllCategories);
exports.default = router;
