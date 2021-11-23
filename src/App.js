import React, { useState } from "react";
const api = {
  key: "a033095717e3d13b07057f3725502834",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          console.log("weather result: ");
          console.log(result);
          fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=000594ff6b2744c59c5381e9948cef87 `
          )
            .then((res) => res.json())
            .then((result2) => {
              console.log("Result2: ");
              console.log(result2["results"][0]["geometry"]["lat"]);
              console.log(result2["results"][0]["geometry"]["lng"]);
              result["weatherLatLon"] = result2["results"][0]["geometry"];
              console.log(result["weatherLatLon"]);
              setWeather(result);
            });
        });
    }
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
            placeholder="Search for a state...."
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
              <div className="weather">
                Latitude: {weather.weatherLatLon.lat}°
              </div>
              <div className="weather">
                Longitude: {weather.weatherLatLon.lng}°
              </div>
              <div className="weather">
                Sky: {weather.weather[0]["description"]}
              </div>
              <div className="weather">
                <img
                  src={"https://cdn-icons-png.flaticon.com/128/632/632517.png"}
                  width="50"
                  height="60"
                  alt="Logo"
                />
                Pressure: {weather.main.pressure} Pa
              </div>
              <div className="weather">Humidity: {weather.main.humidity} %</div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </main>
    </div>
  );
}

export default App;
