import express from "express";
import cors from "cors";
import nautilus from "./api/nautilus.route";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", nautilus);

app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app;