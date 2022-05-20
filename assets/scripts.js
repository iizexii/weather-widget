'use strict'

const weatherBlock = document.querySelector('#weather');

async function loadWeather(e) {
	weatherBlock.innerHTML = `
		<div class="weather__loading-wrapper">
			<img src="img/loading.gif" alt="loading..." class="weather__loading-img">
		</div>
	`;

	const server = 'https://api.openweathermap.org/data/2.5/weather?lat=48.0448&lon=37.9635&units=metric&lang=ru&APPID=c51cb7429686def53cf86f259b3ec003';
	const response = await fetch(server, {
		method: 'GET',
	});
	const responseResult = await response.json();

	if (response.ok) {
		getWeather(responseResult);
	} else {
		weatherBlock.innerHTML = responseResult.message;
	}
}

function getWeather(data) {
	//данные для виджета
	const location = data.name;
	const temp = Math.round(data.main.temp);
	const feelsLike = Math.round(data.main.feels_like);
	const weatherStatus = data.weather[0].description;
	const weatherIcon = data.weather[0].icon;
	const favicon = document.querySelector('#favicon');
	const pressure = Math.round(data.main.pressure / 133.3224 * 100);

	//console.log(data);

	//шаблон html
	const template = `
		<div class="weather__wrapper">
			<div class="weather__header">
				<div class="weather__city-info-wrapper">
					<div class="weather__city">${location}</div>
					<div class="weather__status">${weatherStatus}</div>
				</div>
				<div class="weather__icon-wrapper">
					<img src="https://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}" class="weather__img">
				</div>
			</div>
			<div class="weather__temp">${temp}℃</div>
			<div class="weather__feels-like">По ощущениям: ${feelsLike}℃</div>
			<div class="weather__pressure">Атмосферное давление: ${pressure}мм.рт.ст.</div>
		</div>
	`;

	//вывод в html
	weatherBlock.innerHTML = template;
	favicon.setAttribute('href', `https://openweathermap.org/img/w/${weatherIcon}.png`);
}

if (weatherBlock) {
	loadWeather();
}