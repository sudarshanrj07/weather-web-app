// const locApi = "/location";
const weatherApi = "/weather";

const weatherForm = document.querySelector("form");

const search = document.querySelector("input");

const weatherIcon = document.querySelector(".weatherIcon i");

const weatherCondition = document.querySelector(".weatherCondition");

const tempElement = document.querySelector(".temperature span");

const locationElement = document.querySelector(".place");

const dateElement = document.querySelector(".date");
const currentDate = new Date();
const options = { month: "long" };
const monthName = currentDate.toLocaleString("en-US", options);
dateElement.textContent = new Date().getDate() + ", " + monthName;

// fetch(locApi)
// 	.then((response) => response.json())
// 	.then((data) => {
// 		if (data?.city) {
// 			showData(data.city);
// 		}
// 	})
// 	.catch((err) => {});

if ("geolocation" in navigator) {
	locationElement.textContent = "Loading...";
	navigator.geolocation.getCurrentPosition(
		(position) => {
			const lat = position.coords.latitude;
			const lon = position.coords.longitude;
			const locationApiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
			fetch(locationApiUrl)
				.then((response) => response.json())
				.then((data) => {
					if (data?.address?.city) {
						const city = data.address.city;
						showData(city);
					}
				})
				.catch((err) => {});
		},
		(error) => {}
	);
}

weatherForm.addEventListener("submit", (e) => {
	e.preventDefault();
	locationElement.textContent = "Loading...";
	weatherIcon.className = "";
	tempElement.textContent = "";
	weatherCondition.textContent = "";

	showData(search.value);
});

function showData(city) {
	getWeatherData(city, (result) => {
		// console.log(result);
		if (result.cod === 200) {
			const weatherId = result.weather[0].id;
			if (weatherId >= 200 && weatherId < 300)
				weatherIcon.className = "wi wi-day-thunderstorm";
			else if (weatherId >= 300 && weatherId < 400)
				weatherIcon.className = "wi wi-day-showers";
			else if (weatherId >= 500 && weatherId < 600)
				weatherIcon.className = "wi wi-day-rain";
			else if (weatherId >= 600 && weatherId < 700)
				weatherIcon.className = "wi wi-day-snow";
			else if (weatherId >= 700 && weatherId < 800)
				weatherIcon.className = "wi wi-day-fog";
			else if (weatherId === 800) weatherIcon.className = "wi wi-day-sunny";
			else weatherIcon.className = "wi wi-day-cloudy";
			locationElement.textContent = result?.name;
			tempElement.textContent =
				parseInt(result?.main?.temp) + String.fromCharCode(176) + "C";
			weatherCondition.textContent =
				result?.weather[0]?.description?.toUpperCase();
		} else {
			locationElement.textContent = "City not Found";
		}
	});
}

function getWeatherData(city, callback) {
	const locationApi = weatherApi + "?address=" + city;
	fetch(locationApi).then((response) => {
		response.json().then((response) => {
			callback(response);
		});
	});
}
