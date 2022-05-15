const city = document.querySelector(".city");
const temp = document.querySelector(".temp");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const feelsLike = document.querySelector(".feels-like");
const citiesDropdown = document.getElementById("cities");
const ico = document.getElementById("icon");
const desc = document.getElementById("desc");

let cities = [
  {
    lat: 49.82245,
    lon: 19.04686,
    name: "Bielsko-Biała",
  },
  {
    lat: 52.237049,
    lon: 21.017532,
    name: "Warszawa",
  },
  {
    lat: 53.1324886,
    lon: 23.1688403,
    name: "Białystok",
  },
  {
    lat: 50.06143,
    lon: 19.93658,
    name: "Kraków",
  },
  {
    lat: 53.428543,
    lon: 14.552812,
    name: "Szczecin",
  },
  {
    lat: 51.107883,
    lon: 17.038538,
    name: "Wrocław",
  },
  {
    lat: 52.409538,
    lon: 16.931992,
    name: "Poznań",
  },
];

cities.map((val, i) => {
  let newOption = document.createElement("option");
  citiesDropdown.appendChild(newOption);
  newOption.innerHTML = val.name;
});

const getApi = () => {
  request = fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${
      cities[citiesDropdown.selectedIndex].lat
    }&lon=${
      cities[citiesDropdown.selectedIndex].lon
    }&appid=8e85f0b03edf25a16b4abf242d64788e&units=metric&lang=pl`
  )
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);

      temp.innerHTML = resp.main.temp.toFixed(1);
      pressure.innerHTML = resp.main.pressure;
      humidity.innerHTML = resp.main.humidity;
      feelsLike.innerHTML = resp.main.feels_like.toFixed(1);
      ico.src = `http://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`;
      desc.innerHTML = capitalizeFirstLetter(resp.weather[0].description);
    });
};

window.onload = () => {
  getApi();
};

citiesDropdown.addEventListener("change", () => {
  getApi();
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
