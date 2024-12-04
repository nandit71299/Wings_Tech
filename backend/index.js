import bodyParser from "body-parser";
import express from "express";
import routes from "./routes/index.js";
import dotenv from "dotenv";
import connect from "./config/db.js";
import cors from "cors";
import { authController } from "./controllers/authController.js";
dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use("/api", routes);
app.get("/api/verify-token", authController, (req, res) => {
  res.status(200).json({ success: true, message: "Authentication successful" });
});
connect();

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
