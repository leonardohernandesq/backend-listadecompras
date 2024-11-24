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
exports.authGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = require("../models/UserModel");
// Middleware de autenticação
const authGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Pegar o token do cabeçalho da requisição
        const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        // Verificar se o token foi fornecido
        if (!token) {
            return res.status(401).json({ error: "Acesso negado. Token não fornecido." });
        }
        // Verificar o token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        // Decodifica o token e encontra o usuário
        const user = yield UserModel_1.UserModel.findById(decoded.id);
        // Verifica se o usuário existe
        if (!user) {
            return res.status(401).json({ error: "Usuário não encontrado." });
        }
        // Anexar o usuário à requisição (req.user)
        req.user = user;
        // Prosseguir para o próximo middleware ou rota
        next();
    }
    catch (error) {
        console.error("Erro na autenticação:", error);
        res.status(401).json({ error: "Token inválido ou expirado." });
    }
});
exports.authGuard = authGuard;
