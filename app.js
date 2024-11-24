"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const Router_1 = __importDefault(require("./routes/Router"));
require("./config/db");
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
const allowedOrigins = ["http://localhost:3000", "https://backend-listadecompras.vercel.app/"];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Não permitido pelo CORS"));
        }
    },
    credentials: true
}));
app.use(Router_1.default);
app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
