import { Router } from "express";
import { weatherData } from "../../utils/weatherData.mjs";

const router = Router();

router.get("/", (req, res) => {
	res.render("index", { title: "Weather Web App" });
});

router.get("/weather", (req, res) => {
	if (!req.query.address) return res.send("Address is required");
	weatherData(req.query.address, "metric", (err, result) => {
		if (err) return res.status(401).send(err);
		res.send(result);
	});
});

router.get("*", (req, res) => {
	res.render("404", { title: "Page not found" });
});

export default router;
