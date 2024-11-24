"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserRoutes_1 = __importDefault(require("../routes/UserRoutes"));
const ShoppingItemRoutes_1 = __importDefault(require("./ShoppingItemRoutes"));
const ShoppingListRoutes_1 = __importDefault(require("./ShoppingListRoutes"));
const CategoryRoutes_1 = __importDefault(require("./CategoryRoutes"));
const router = (0, express_1.Router)();
router.use("/api/users", UserRoutes_1.default);
router.use("/api/item", ShoppingItemRoutes_1.default);
router.use("/api/list", ShoppingListRoutes_1.default);
router.use("/api/category", CategoryRoutes_1.default);
router.get("/", (req, res) => {
    res.send("API Working");
});
exports.default = router;
