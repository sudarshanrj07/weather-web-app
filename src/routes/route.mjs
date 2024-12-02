import { Router } from "express";
import { weatherData } from "../../utils/weatherData.mjs";
import axios from "axios";
import "dotenv/config";

const router = Router();

router.get("/", async (req, res) => {
	res.render("index", { title: "Weather Web App" });
});

router.get("/weather", (req, res) => {
	if (!req.query.address) return res.send("Address is required");
	weatherData(req.query.address, "metric", (err, result) => {
		if (err) return res.status(401).send(err);
		res.send(result);
	});
});

router.get("/location", async (req, res) => {
	try {
		const response = await axios.get(
			`https://ipinfo.io/json?token=${process.env.IP_API_KEY}`
		);
		const data = response.data;
		if (data?.city) {
			res.send(data);
		}
	} catch (error) {
		console.error("Error fetching location data:", error);
	}
});
router.get("*", (req, res) => {
	res.render("404", { title: "Page not found" });
});

export default router;
