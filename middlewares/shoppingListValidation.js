"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingListUpdateValidation = exports.shoppingListCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const shoppingListCreateValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .isString().withMessage("O nome da lista é obrigatório.")
            .isLength({ min: 3 }).withMessage("O nome da lista precisa ter no mínimo 3 caracteres."),
    ];
};
exports.shoppingListCreateValidation = shoppingListCreateValidation;
const shoppingListUpdateValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .optional()
            .isString().withMessage("O nome da lista precisa ser uma string válida.")
            .isLength({ min: 3 }).withMessage("O nome da lista precisa ter no mínimo 3 caracteres."),
    ];
};
exports.shoppingListUpdateValidation = shoppingListUpdateValidation;
