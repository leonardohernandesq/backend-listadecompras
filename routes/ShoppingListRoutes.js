"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const shoppingListValidation_1 = require("../middlewares/shoppingListValidation");
const handleValidation_1 = require("../middlewares/handleValidation");
const ShoppingListController_1 = require("../controllers/ShoppingListController");
const authGuard_1 = require("../middlewares/authGuard");
const router = (0, express_1.Router)();
// Criar nova lista de compras
router.post("/", authGuard_1.authGuard, (0, shoppingListValidation_1.shoppingListCreateValidation)(), handleValidation_1.validate, ShoppingListController_1.createShoppingList);
router.put("/add", authGuard_1.authGuard, ShoppingListController_1.addItemToShopping);
router.put("/remove", authGuard_1.authGuard, ShoppingListController_1.deleteItemToShopping);
// Atualizar uma lista de compras
router.put("/:id", authGuard_1.authGuard, (0, shoppingListValidation_1.shoppingListUpdateValidation)(), handleValidation_1.validate, ShoppingListController_1.updateShoppingList);
router.put("/bought/:itemId", authGuard_1.authGuard, ShoppingListController_1.markItemAsBoughtInList);
// Deletar uma lista de compras
router.delete("/:id", authGuard_1.authGuard, ShoppingListController_1.deleteShoppingList);
// Obter todas as listas de compras
router.get("/", authGuard_1.authGuard, ShoppingListController_1.getAllShoppingLists);
router.get("/:id", authGuard_1.authGuard, ShoppingListController_1.getShoppingListById);
exports.default = router;
