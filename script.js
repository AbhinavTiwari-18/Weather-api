const apikey = "76b9a495a30d44c6836155804242307";
const apiurl = "https://api.weatherapi.com/v1/current.json?key=" + apikey;

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

async function checkweather(city) {
  try {
    const response = await fetch(`${apiurl}&q=${city}&aqi=no`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.location.country;
    document.querySelector(".temp").innerHTML =
      Math.round(data.current.temp_c) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";
  } catch (error) {
    console.error("Error fetching the weather data:", error);
  }
}

checkweather("London"); // Initial call to display weather for London

searchBtn.addEventListener("click", () => {
  checkweather(searchbox.value);
});
