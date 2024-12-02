import request from "request";
import "dotenv/config";

const openWeatherMap = {
	BASE_URL: "https://api.openweathermap.org/data/2.5/weather?q=",
	SECRET_KEY: process.env.API_KEY,
};

export const weatherData = (address, units, callback) => {
	const url =
		openWeatherMap.BASE_URL +
		encodeURIComponent(address) +
		"&units=" +
		encodeURIComponent(units) +
		"&APPID=" +
		openWeatherMap.SECRET_KEY;

	request({ url, json: true }, (err, data) => {
		if (err) callback(true, "Unable to fetch data, Please try again" + err);
		callback(false, data?.body);
	});
};
