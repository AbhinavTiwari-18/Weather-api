const apikey = "76b9a495a30d44c6836155804242307";
const apiurl = "http://api.weatherapi.com/v1/current.json?key=" + apikey;

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon"); // Assuming weatherIcon is an <img> element

async function checkweather(city) {
  try {
    const response = await fetch(`${apiurl}&q=${city}&aqi=no`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data); // Debugging: Log the data to check structure

    // Display weather data
    document.querySelector(".city").innerHTML = data.location.country;
    document.querySelector(".temp").innerHTML =
      Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";

    // Set weather icon based on the weather condition
    const weatherCondition = data.current.condition.text.toLowerCase();
    console.log("Weather condition:", weatherCondition); // Debugging: Log the condition text

    if (weatherCondition.includes("cloud")) {
      weatherIcon.src = "images/clouds.png";
    } else if (weatherCondition.includes("rain")) {
      weatherIcon.src = "images/rain.png";
    } else if (weatherCondition.includes("clear")) {
      weatherIcon.src = "images/clear.png";
    } else if (weatherCondition.includes("drizzle")) {
      weatherIcon.src = "images/drizzle.png";
    } else if (weatherCondition.includes("mist")) {
      weatherIcon.src = "images/mist.png";
    }
  } catch (error) {
    console.error("Error fetching the weather data:", error);
  }
}

checkweather("London"); // Initial call to display weather for London

searchBtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});
