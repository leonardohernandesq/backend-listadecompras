"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginValidation = exports.userCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const userCreateValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .isString().withMessage("O nome é obrigatório.")
            .isLength({ min: 3 }).withMessage("O nome precisa ter no mínimo 3 caracteres."),
        (0, express_validator_1.body)("email")
            .isString().withMessage("O email é obrigatório.")
            .isEmail().withMessage("O campo precisa ser um email."),
        (0, express_validator_1.body)("password")
            .isString().withMessage("A senha é obrigatória.")
            .isLength({ min: 5 }).withMessage("A senha precisa ter no mínimo 5 caracteres."),
        (0, express_validator_1.body)("confirmPassword")
            .isString().withMessage("A confirmação é obrigatória.")
            .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error("As senhas não são iguais.");
            }
            return true;
        }),
    ];
};
exports.userCreateValidation = userCreateValidation;
const userLoginValidation = () => {
    return [
        (0, express_validator_1.body)("name")
            .optional()
            .isLength({ min: 3 }).withMessage("O nome precisa ter no mínimo 3 caracteres."),
        (0, express_validator_1.body)("password")
            .optional()
            .isLength({ min: 5 }).withMessage("A senha precisa ter no mínimo 5 caracteres."),
    ];
};
exports.userLoginValidation = userLoginValidation;
