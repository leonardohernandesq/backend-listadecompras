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
exports.deleteCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const CategoryModel_1 = require("../models/CategoryModel");
const mongoose_1 = __importDefault(require("mongoose"));
// Criar uma nova categoria
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        // Criar nova categoria
        const newCategory = new CategoryModel_1.CategoryModel({
            name,
            user: req.user._id, // Supondo que o middleware de autenticação injete o user no req
        });
        const savedCategory = yield newCategory.save();
        res.status(201).json(savedCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao criar categoria" });
    }
});
exports.createCategory = createCategory;
// Obter todas as categorias do usuário
const getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield CategoryModel_1.CategoryModel.find({ user: req.user._id });
        res.status(200).json(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar categorias" });
    }
});
exports.getAllCategories = getAllCategories;
// Obter uma categoria específica pelo ID
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Verifica se o ID é um ObjectId válido
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "ID de categoria inválido" });
        }
        const category = yield CategoryModel_1.CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }
        res.status(200).json(category);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar categoria" });
    }
});
exports.getCategoryById = getCategoryById;
// Remover uma categoria
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Procurar a categoria
        const category = yield CategoryModel_1.CategoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ error: "Categoria não encontrada" });
        }
        // Remover a categoria
        yield CategoryModel_1.CategoryModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Categoria removida com sucesso" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao remover categoria" });
    }
});
exports.deleteCategory = deleteCategory;
