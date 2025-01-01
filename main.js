const apiKey = "ebed5f20b2837033db2c00d5b8ff6362";

document.getElementById("search-btn").addEventListener("click", () => {
    const city = document.getElementById("search").value;
    if (city) {
        checkWeather(city);
    } else {
        alert("Please enter a city name!");
    }
});

async function checkWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("City not found!");
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeather(data) {
    // Update Weather Icon
    document.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    // Update Main Temperature Display
    const mainTempElement = document.querySelector(".temp");
    mainTempElement.textContent = `${Math.round(data.main.temp)}°C`;

    // Update Temperature in Details Section
    const detailsTempElement = document.querySelector(".details .temp");
    detailsTempElement.textContent = `${Math.round(data.main.temp)}°C`;

    // Update City Name
    document.querySelector(".city").textContent = data.name;

    // Update Humidity
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;

    // Update Wind Speed
    document.querySelector(".wind").textContent = `${data.wind.speed} km/h`;
}
