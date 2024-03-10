import { useEffect, useState } from "react";
import config from "./config";

function App() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [cityInfo, setCityInfo] = useState(null);
  const searchCity = () => {
    if (city.length !== 0) {
      //call api
      fetch(`${config.baseURL}/current.json?key=${config.apiKey}&q=${city}`)
        .then((res) => res.json())
        .then((response) => {
          if (response.error) throw new Error(response.error.message);
          console.log(response);
          setCityInfo(response);
        })
        .catch((err) => console.log(err));
    }
  };
  const addCity = (city) => {
    setCities((prev) => [...prev, city]);
  };
  useEffect(() => {
    console.log("city", city);
    console.log("cities", cities);
  }, [city, cities]);
  return (
    <div className="flex flex-col m-2">
      <div className="flex gap-4 w-full max-w-6xl m-2 mx-auto">
        <input
          onChange={(e) => {
            setCity(e.target.value);
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
        <div className="flex gap-2">
          <p>
            {cityInfo.location.name}, {cityInfo.location.region}
          </p>
          <button
            className="px-2 py-1 mx-2 bg-green-200 rounded-lg"
            onClick={() => addCity(cityInfo.location.name)}
          >
            Add
          </button>
        </div>
      )}
      <section className="grid grid-cols-2 xs:flex xs:flex-col bg-gray-500 rounded-xl p-4 gap-2"></section>
    </div>
  );
}

export default App;
