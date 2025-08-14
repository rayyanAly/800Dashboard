import express from "express";
import cors from "cors";
import { api } from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", api);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Backend listening on http://localhost:${port}`);
});
