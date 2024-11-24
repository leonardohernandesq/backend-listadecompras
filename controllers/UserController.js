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
exports.verifyToken = exports.updateUser = exports.loginUser = exports.registerUser = void 0;
const UserModel_1 = require("../models/UserModel");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Registrar um novo usuário
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // Verificar se o usuário já existe
        const existingUser = yield UserModel_1.UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Usuário já existe" });
        }
        // Criptografar senha
        const salt = yield bcryptjs_1.default.genSalt(10);
        const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
        // Criar novo usuário
        const newUser = new UserModel_1.UserModel({
            name,
            email,
            password: hashedPassword
        });
        const savedUser = yield newUser.save();
        // Retornar o novo usuário
        res.status(201).json(savedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});
exports.registerUser = registerUser;
// Fazer login de usuário
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Procurar usuário por email
        const user = yield UserModel_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        // Verificar a senha
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Senha incorreta" });
        }
        // Gerar token JWT
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // Retornar o token e os dados do usuário
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao fazer login" });
    }
});
exports.loginUser = loginUser;
// Atualizar perfil do usuário
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = req.body;
        // Procurar o usuário
        const user = yield UserModel_1.UserModel.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        // Atualizar o nome, se fornecido
        if (name)
            user.name = name;
        // Atualizar a senha, se fornecida
        if (password) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            user.password = yield bcryptjs_1.default.hash(password, salt);
        }
        const updatedUser = yield user.save();
        // Retornar o usuário atualizado
        res.status(200).json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao atualizar perfil" });
    }
});
exports.updateUser = updateUser;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        // Verifique se o token foi fornecido no cabeçalho de autorização
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({ error: "Token não fornecido" });
        }
        // Extrair o token da string "Bearer <token>"
        const token = authHeader.split(' ')[1];
        // Verificar e decodificar o token
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: "Token inválido" });
            }
            // Verificar se o token foi decodificado corretamente
            const userData = decoded;
            // Retornar o ID do usuário se o token for válido
            return res.status(200).json({ message: "Token válido", userId: userData.id });
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao verificar token" });
    }
});
exports.verifyToken = verifyToken;
