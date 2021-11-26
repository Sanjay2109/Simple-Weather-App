import React, { useState } from "react";
// const api = {
//   key: "a033095717e3d13b07057f3725502834",
//   base: "https://api.openweathermap.org/data/2.5/",
// };

const mapApi = {
  base: "https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=jhw6OODF_kcD6tEinAYP6tnM_qw0G4_6UAlt5u9R-qU&pview=ARG&w=350&h=350&z=5",
};

const icon = {
  base: "http://openweathermap.org/img/wn/",
  end: "@2x.png",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [astroData, setAstroData] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=a033095717e3d13b07057f3725502834`
      )
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          console.log("Weather result: ");
          console.log(result);
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=000594ff6b2744c59c5381e9948cef87`
          )
            .then((res) => res.json())
            .then((result2) => {
              console.log("Latitude and Longitude: ");
              console.log(`Lat: ${result2["results"][0]["geometry"]["lat"]}`);
              console.log(`Lon: ${result2["results"][0]["geometry"]["lng"]}`);
              result["weatherLatLon"] = result2["results"][0]["geometry"];
              console.log(result["weatherLatLon"]);
              setWeather(result);
            });
        });
      const date = new Date();
      console.log(date.toISOString().split("T")[0]);
      fetch(
        `https://api.weatherapi.com/v1/astronomy.json?key=2daa2961afe54bf692f141623212108%20&q=Chennai&dt${
          date.toISOString().split("T")[0]
        }`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log("The astro result: ");
          console.log(result["astronomy"]);
          setAstroData(result["astronomy"]);
        });
    }
  };

  const capitalize = (word) => {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a place...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <span> | {capitalize(weather.weather[0].description)}</span>
              <div className="weather">
                {" "}
                <img
                  src={`${icon.base}${weather["weather"][0]["icon"]}${icon.end}`}
                  width="95"
                  height="100"
                  alt="Logo"
                />
                {weather.weather[0]["main"]}
              </div>

              {/* <div className="weather">🌅 {astroData.astro.sunrise}</div> */}
              <div className="weather">🌆 {astroData.astro.sunset}</div>
              <div className="weather">
                Moon phase: {astroData.astro.moon_phase}
              </div>
            </div>
          </div>
        ) : (
          <div>{/* <script /> */}</div>
        )}
      </main>
    </div>
  );
}

export default App;

//url to the website is "https://simplest-weather-app.netlify.app". :)
