import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import hbs from "hbs";
import routes from "./routes/route.mjs";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(routes);

const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.set(express.static(publicPath));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listning at PORT: ${PORT}`);
});
