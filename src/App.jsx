import { useEffect, useState } from "react";
import config from "./config";

function App() {
  const [param, setParam] = useState("");
  const [cities, setCities] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const searchCity = () => {
    if (param.length !== 0) {
      fetch(`${config.baseURL}/current.json?key=${config.apiKey}&q=${param}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.error) throw new Error(response.error.message);
          console.log(response);
          setCityInfo(response);
        })
        .catch((err) => alert(err));
    }
  };
  const addCity = (city) => {
    setCities((prev) => [...prev, city]);
    setCityInfo(null);
  };
  const removeCity = (city) => {
    setCities((prev) =>
      prev.filter((old) => old.location.name !== city.location.name)
    );
  };
  return (
    <div className="flex flex-col gap-2 m-2">
      <h4 className="text-center text-3xl sm:text-2xl xs:text-xl font-serif mt-2">
        Weather app
      </h4>
      <div className="flex gap-2 w-full max-w-6xl m-2 mx-auto">
        <input
          onChange={(e) => {
            setParam(e.target.value);
          }}
          placeholder="Enter a city name"
          className="flex-1 border rounded-md px-2 py-1"
        />
        <button
          onClick={searchCity}
          className="px-2 py-1 mx-2 bg-orange-200 hover:bg-orange-400 rounded-lg duration-200"
        >
          search
        </button>
      </div>
      {cityInfo && (
        <div className="flex gap-2 items-center justify-center border bg-white w-fit rounded-md my-2 mx-auto">
          <div className="p-2">
            <p>
              {cityInfo.location.name}, {cityInfo.location.region}
            </p>
            <p>{cityInfo.current.condition.text}</p>
          </div>
          <p>{cityInfo.current.temp_c} &deg;C</p>
          <button
            className="mx-2 px-2 py-1 bg-green-300 rounded-lg hover:bg-green-500 duration-200"
            onClick={() => addCity(cityInfo)}
          >
            Add
          </button>
        </div>
      )}
      <section className="grid grid-cols-2 sm:flex sm:flex-col xs:flex xs:flex-col rounded-xl gap-2 font-mono">
        {cities.map((city) => (
          <div
            key={city.location.name}
            className="flex gap-2 m-2 xs:mx-auto sm:text-sm xs:text-sm items-center border p-1 rounded-lg bg-white"
          >
            <img src={city.current.condition.icon} alt="" />
            <div className="flex flex-col gap-0.5 flex-1">
              <p>
                {city.location.name}, {city.location.region}
              </p>
              <p>{city.current.condition.text}</p>
              <span className="flex gap-3">
                <p>Temp: {city.current.temp_c} &deg;C</p>
                <p>Humidity: {city.current.humidity} %</p>
              </span>
            </div>
            <button
              className="mx-2 px-2 py-1 rounded-md bg-red-300 hover:bg-red-500 duration-200"
              onClick={() => removeCity(city)}
            >
              Remove
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
