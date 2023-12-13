document.getElementById("searchButton").addEventListener("click", function () {
  const searchInput = document.getElementById("searchInput").value;
  getWeather(searchInput);
});

async function getWeather(country) {
  const apiKey = "d93de1abad35647980264a8343089c6f";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    console.log("Error fetching data: ", error);
  }
}

function displayWeather(data) {
  const weatherInfo = document.getElementById("weatherInfo");
  weatherInfo.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Temperature: ${Math.round(data.main.temp - 273.15)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <img src="${getWeatherImage(data.weather[0].main)}" alt="Weather Image">
    `;
}

function getWeatherImage(weather) {
  switch (weather) {
    case "Rain":
      return "https://cdn-icons-png.flaticon.com/512/116/116251.png";
    case "Clouds":
      return "https://cdn.iconscout.com/icon/free/png-256/free-clouds-192-1113583.png";
    case "Clear":
      return "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
    case "Thunderstorm":
      return "https://cdn-icons-png.flaticon.com/512/3104/3104612.png";
    default:
      return "";
  }
}
