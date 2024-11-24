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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShoppingItemByCategory = exports.getShoppingItemById = exports.getAllShoppingItems = exports.deleteShoppingItem = exports.updateShoppingItem = exports.createShoppingItem = void 0;
const ShoppingItemModel_1 = require("../models/ShoppingItemModel");
// Criar um novo item na lista de compras
const createShoppingItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, categoryId } = req.body;
        // Criar o novo item
        const newItem = new ShoppingItemModel_1.ShoppingItemModel({
            name,
            user: req.user._id,
            categoryId
        });
        // Salvar o novo item
        const savedItem = yield newItem.save();
        // Retornar o item criado
        res.status(201).json(savedItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar item de compras" });
    }
});
exports.createShoppingItem = createShoppingItem;
// Atualizar um item na lista de compras
const updateShoppingItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { itemId } = req.params;
        const { name } = req.body;
        // Procurar o item pelo ID
        const item = yield ShoppingItemModel_1.ShoppingItemModel.findById(itemId);
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
        // Atualizar as propriedades do item
        item.name = name || item.name;
        // Salvar as atualizações
        const updatedItem = yield item.save();
        // Retornar o item atualizado
        res.status(200).json(updatedItem);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar item de compras" });
    }
});
exports.updateShoppingItem = updateShoppingItem;
// Remover um item da lista de compras
const deleteShoppingItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Verificar se o item existe
        const item = yield ShoppingItemModel_1.ShoppingItemModel.findById(id);
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
        // Remover o item
        yield ShoppingItemModel_1.ShoppingItemModel.findByIdAndDelete(id);
        // Retornar a confirmação de remoção
        res.status(200).json({ message: "Item removido com sucesso" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover item de compras" });
    }
});
exports.deleteShoppingItem = deleteShoppingItem;
// Obter todos os itens de compra
const getAllShoppingItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield ShoppingItemModel_1.ShoppingItemModel.find({ user: req.user._id }); // Filtra por usuário autenticado
        res.status(200).json(items);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao obter itens de compras" });
    }
});
exports.getAllShoppingItems = getAllShoppingItems;
// Obter um item de compra por ID
const getShoppingItemById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const item = yield ShoppingItemModel_1.ShoppingItemModel.findById(id);
        if (!item) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
        res.status(200).json(item);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao obter item de compras" });
    }
});
exports.getShoppingItemById = getShoppingItemById;
// Obter itens de compra por categoria
const getShoppingItemByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId } = req.params;
        // Busca diretamente por categoryId sem conversão para ObjectId
        const items = yield ShoppingItemModel_1.ShoppingItemModel.find({ categoryId });
        if (items.length === 0) {
            return res.status(404).json({ error: "Nenhum item encontrado para essa categoria" });
        }
        res.status(200).json(items);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao obter itens de compras" });
    }
});
exports.getShoppingItemByCategory = getShoppingItemByCategory;
