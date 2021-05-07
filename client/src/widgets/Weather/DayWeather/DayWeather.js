import { useState } from 'react';

import "weather-icons/css/weather-icons.css";

function DayWeather(props) {

  const [error, setError] = useState(false);
  const [weather, setWeather] = useState();

  const weatherIcons = {
    Thunderstorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain: "wi-storm-showers",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  }

  const getWeatherIcon = (rangeId) => {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        return weatherIcons.Thunderstorm;
      case rangeId >= 300 && rangeId <= 321:
        return weatherIcons.Drizzle;
      case rangeId >= 500 && rangeId <= 521:
        return weatherIcons.Rain;
      case rangeId >= 600 && rangeId <= 622:
        return weatherIcons.Snow;
      case rangeId >= 701 && rangeId <= 781:
        return weatherIcons.Atmosphere;
      case rangeId === 800:
        return weatherIcons.Clear;
      case rangeId >= 801 && rangeId <= 804:
        return weatherIcons.Clouds;
      default:
        return weatherIcons.Clouds;
    }
  }

  const fahrenheitToCelsius = (temp) => Math.floor(temp - 273.15);

  const callWeatherApi = async e => {
    e.preventDefault()

    const country = e.target.elements.country.value;
    const city = e.target.elements.city.value;

    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`
    ).json();

    setWeather(response);
  }

  return (
    <div>
      <h1>Weather of the day</h1>
      {weather ? (
        <div>
          <h1>{`${weather.name}, ${weather.sys.country}`}</h1>
          <h5>
            <i className={`wi ${getWeatherIcon(weather.weather[0].id)} display-1`} />
          </h5>
          {props.temp_celsius ? (
            <h1>{props.temp_celsius}&deg;</h1>
          ) : null}
          {maxminTemp(props.temp_min, props.temp_max)}
          <h4>
            {props.description.charAt(0).toUpperCase() +
              props.description.slice(1)}
          </h4>
        </div>
      ) : (
        <form onSubmit={callWeatherApi}>
          <input
            type="text"
            placeholder="City"
            name="city"
            autoComplete="off"
          />
          <input
            type="text"
            placeholder="Country"
            name="country"
            autoComplete="off"
          />
          <button>Get Weather</button>
        </form>
      )}
    </div>
  );
}

export default DayWeather;