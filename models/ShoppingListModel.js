"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoppingListModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const shoppingListSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    items: [
        {
            _id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'ShoppingItem',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            bought: {
                type: Boolean,
                default: false,
            },
        },
    ],
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User', // Relaciona a lista ao usuário
        required: true,
    },
}, {
    timestamps: true,
});
exports.ShoppingListModel = mongoose_1.default.model("ShoppingList", shoppingListSchema);
