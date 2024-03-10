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
    <div className="flex flex-col m-2">
      <div className="flex gap-4 w-full max-w-6xl m-2 mx-auto">
        <input
          onChange={(e) => {
            setParam(e.target.value);
          }}
          placeholder="Enter a city name"
          className="flex-1 border rounded-md px-2 py-1"
        />
        <button
          onClick={searchCity}
          className="px-2 py-1 mx-2 bg-orange-200 rounded-lg"
        >
          search
        </button>
      </div>
      {cityInfo && (
        <div className="flex gap-2 items-center justify-center border bg-blue-200 w-full rounded-md my-2">
          <div className="p-2">
            <p>
              {cityInfo.location.name}, {cityInfo.location.region}
            </p>
            <p>{cityInfo.current.condition.text}</p>
          </div>
          <p>{cityInfo.current.temp_c} &deg;C</p>
          <button
            className="px-2 py-1 mx-2 bg-green-200 rounded-lg h-fit"
            onClick={() => addCity(cityInfo)}
          >
            Add
          </button>
        </div>
      )}
      <section className="grid grid-cols-2 xs:flex xs:flex-col bg-gray-500 rounded-xl gap-2 ">
        {cities.map((city) => (
          <div
            key={city.location.name}
            className="flex gap-2 m-2 xs:mx-auto sm:text-sm xs:text-xs items-center border p-1 rounded-lg bg-white"
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
            <button className="mx-2" onClick={() => removeCity(city)}>
              Remove
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default App;
