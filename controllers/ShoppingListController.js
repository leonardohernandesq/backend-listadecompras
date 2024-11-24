"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemToShopping = exports.markItemAsBoughtInList = exports.addItemToShopping = exports.deleteShoppingList = exports.updateShoppingList = exports.getShoppingListById = exports.getAllShoppingLists = exports.createShoppingList = void 0;
const ShoppingListModel_1 = require("../models/ShoppingListModel");
const ShoppingItemModel_1 = require("../models/ShoppingItemModel");
const mongoose_1 = __importDefault(require("mongoose"));
const createShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const newList = new ShoppingListModel_1.ShoppingListModel({
            name,
            user: req.user._id,
            items: []
        });
        const savedList = yield newList.save();
        res.status(201).json(savedList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar lista de compras" });
    }
});
exports.createShoppingList = createShoppingList;
const getAllShoppingLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shoppingLists = yield ShoppingListModel_1.ShoppingListModel.find({ user: req.user._id });
        res.status(200).json(shoppingLists);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar listas de compras" });
    }
});
exports.getAllShoppingLists = getAllShoppingLists;
const getShoppingListById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const shoppingList = yield ShoppingListModel_1.ShoppingListModel.findById(id);
        res.status(200).json(shoppingList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar listas de compras" });
    }
});
exports.getShoppingListById = getShoppingListById;
const updateShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { listId } = req.params;
        const { name } = req.body;
        // Procurar a lista
        const shoppingList = yield ShoppingListModel_1.ShoppingListModel.findById(listId);
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compras não encontrada" });
        }
        // Atualizar os campos
        shoppingList.name = name || shoppingList.name;
        const updatedList = yield shoppingList.save();
        res.status(200).json(updatedList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar lista de compras" });
    }
});
exports.updateShoppingList = updateShoppingList;
const deleteShoppingList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const shoppingList = yield ShoppingListModel_1.ShoppingListModel.findById(id);
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compras não encontrada" });
        }
        yield ShoppingListModel_1.ShoppingListModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Lista de compras removida com sucesso", id });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover lista de compras" });
    }
});
exports.deleteShoppingList = deleteShoppingList;
const addItemToShopping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId, listId, quantity, bought } = req.body;
        const shoppingList = yield ShoppingListModel_1.ShoppingListModel.findById(listId);
        const shoppingItem = yield ShoppingItemModel_1.ShoppingItemModel.findById(itemId);
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compra não encontrada" });
        }
        if (!shoppingItem) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
        // Verifica se o item já existe na lista
        const itemExists = shoppingList.items.some((uniqueItem) => uniqueItem._id.toString() === itemId.toString());
        if (itemExists) {
            return res.status(422).json({ error: "O item já existe na lista" });
        }
        shoppingList.items.push({
            _id: itemId,
            quantity: quantity || 1,
            bought: bought || false,
        });
        const newList = yield shoppingList.save();
        res.status(200).json(newList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao adicionar o item na lista." });
    }
});
exports.addItemToShopping = addItemToShopping;
// Marcar item como comprado dentro da lista de compras
const markItemAsBoughtInList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const { listId } = req.body;
        // Procurar a lista de compras pelo ID
        const shoppingList = yield ShoppingListModel_1.ShoppingListModel.findById(listId);
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compras não encontrada" });
        }
        // Procurar o item dentro da lista de compras
        const item = shoppingList.items.find((uniqueItem) => uniqueItem._id.toString() === itemId.toString());
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado na lista" });
        }
        // Alternar o status de "bought"
        item.bought = !item.bought;
        // Salvar a lista de compras atualizada
        const updatedList = yield shoppingList.save();
        // Retornar a lista de compras atualizada
        res.status(200).json(updatedList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao marcar item como comprado" });
    }
});
exports.markItemAsBoughtInList = markItemAsBoughtInList;
const deleteItemToShopping = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId, listId } = req.body;
        if (!mongoose_1.default.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ error: "ID do item inválido" });
        }
        const shoppingList = yield ShoppingListModel_1.ShoppingListModel.findById(listId);
        if (!shoppingList) {
            return res.status(404).json({ error: "Lista de compra não encontrada" });
        }
        shoppingList.items.pull({ _id: itemId });
        const newList = yield shoppingList.save();
        res.status(200).json(newList);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao deletar o item na lista." });
    }
});
exports.deleteItemToShopping = deleteItemToShopping;
