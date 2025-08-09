// Replace with your OpenWeatherMap API key
const API_KEY = "YOUR_API_KEY";
const CITY = "London"; // Change to your city

async function getClimate() {
  try {
    // 1. Get city coordinates
    let geoRes = await fetch(https://api.openweathermap.org/geo/1.0/direct?q=${CITY}&limit=1&appid=${API_KEY});
    let geoData = await geoRes.json();
    let { lat, lon } = geoData[0];

    // 2. Get weather
    let weatherRes = await fetch(https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric);
    let weatherData = await weatherRes.json();

    // 3. Get AQI
    let aqiRes = await fetch(https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY});
    let aqiData = await aqiRes.json();

    // 4. Update HTML
    document.getElementById("temp").textContent = weatherData.main.temp;
    document.getElementById("humidity").textContent = weatherData.main.humidity;
    document.getElementById("precip").textContent = weatherData.rain ? weatherData.rain["1h"] : 0;
    document.getElementById("aqi").textContent = aqiData.list[0].main.aqi;

  } catch (err) {
    console.error("Error fetching climate data:", err);
  }
}

getClimate();
