"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shoppingItemUpdateValidation = exports.shoppingItemCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const shoppingItemCreateValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .isString().withMessage("O nome do item é obrigatório.")
            .isLength({ min: 2 }).withMessage("O nome do item precisa ter no mínimo 2 caracteres."),
        (0, express_validator_1.body)("price")
            .optional()
            .isFloat({ min: 0 }).withMessage("O preço precisa ser um número positivo."),
        (0, express_validator_1.body)("categoryId")
            .optional()
            .isMongoId().withMessage("O ID da categoria precisa ser válido."),
    ];
};
exports.shoppingItemCreateValidation = shoppingItemCreateValidation;
const shoppingItemUpdateValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .optional()
            .isString().withMessage("O nome do item precisa ser uma string válida.")
            .isLength({ min: 2 }).withMessage("O nome do item precisa ter no mínimo 2 caracteres."),
        (0, express_validator_1.body)("price")
            .optional()
            .isFloat({ min: 0 }).withMessage("O preço precisa ser um número positivo."),
        (0, express_validator_1.body)("categoryId")
            .optional()
            .isMongoId().withMessage("O ID da categoria precisa ser válido."),
    ];
};
exports.shoppingItemUpdateValidation = shoppingItemUpdateValidation;
