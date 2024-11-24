import "dotenv/config";
import express from "express";
import cors from "cors";
import router from "./routes/Router";
import "./config/db";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const allowedOrigins = ["http://localhost:3000", "https://backend-listadecompras.vercel.app/"];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Não permitido pelo CORS"));
        }
    },
    credentials: true
}));


app.use(router);

app.listen(port, () => {
    console.log(`Rodando na porta ${port}`);
});
