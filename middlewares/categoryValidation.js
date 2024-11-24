"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryUpdateValidation = exports.categoryCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const categoryCreateValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .isString().withMessage("O nome da categoria é obrigatório.")
            .isLength({ min: 3 }).withMessage("O nome da categoria precisa ter no mínimo 3 caracteres."),
    ];
};
exports.categoryCreateValidation = categoryCreateValidation;
const categoryUpdateValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .optional()
            .isString().withMessage("O nome da categoria precisa ser uma string válida.")
            .isLength({ min: 3 }).withMessage("O nome da categoria precisa ter no mínimo 3 caracteres."),
    ];
};
exports.categoryUpdateValidation = categoryUpdateValidation;
