"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingItemValidation_1 = require("../middlewares/shoppingItemValidation");
const handleValidation_1 = require("../middlewares/handleValidation");
const ShoppingItemController_1 = require("../controllers/ShoppingItemController");
const authGuard_1 = require("../middlewares/authGuard");
const router = (0, express_1.Router)();
// Criar novo item de compra
router.post("/", authGuard_1.authGuard, (0, shoppingItemValidation_1.shoppingItemCreateValidation)(), handleValidation_1.validate, ShoppingItemController_1.createShoppingItem);
// Atualizar um item de compra
router.put("/:id", authGuard_1.authGuard, (0, shoppingItemValidation_1.shoppingItemUpdateValidation)(), handleValidation_1.validate, ShoppingItemController_1.updateShoppingItem);
// Deletar um item de compra
router.delete("/:id", authGuard_1.authGuard, ShoppingItemController_1.deleteShoppingItem);
router.get("/", authGuard_1.authGuard, ShoppingItemController_1.getAllShoppingItems);
router.get("/category/:categoryId", authGuard_1.authGuard, ShoppingItemController_1.getShoppingItemByCategory);
router.get("/:id", authGuard_1.authGuard, ShoppingItemController_1.getShoppingItemById);
exports.default = router;
