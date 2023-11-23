import express from "express";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import open from "open";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const PORT = process.env.PORT || 3000;
const distDir = resolve(__dirname, "dist");

app.use(express.static(distDir));

app.get("/", (req, res) => {
  res.sendFile(resolve(distDir, "index.html"));
});

app.listen(PORT, async () => {
  console.log(`App started at ${PORT} port`);
  open(`http://localhost:${PORT}`);
});
