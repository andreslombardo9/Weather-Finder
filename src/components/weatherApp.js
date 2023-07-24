import { useEffect, useState } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMaininfo";
import styles from './weatherApp.module.css'
import Loading from './loading'

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadInfo();
  }, []);

  useEffect(() => {
    document.title = `Weather | ${weather?.location.name ?? ""}`;
  }, [weather]);

  async function loadInfo(city = "argentina") {
    setLoading(true);
    try {
      if (!city) {
        setWeather(null);
        setLoading(false);
        return;
      }

      const request = await fetch(
        `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
      );
      const json = await request.json();
      console.log(json);

      if (json.error || !json.location) {
        // Si los datos de clima no se encuentran o hay un error en la respuesta,
        // mostramos el mensaje "No se encontraron datos de clima."
        setWeather(null);
      } else {
        setWeather({ ...json });
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

  function handleOnChangeCity(city) {
    setWeather(null);
    loadInfo(city);
  }

  return (
    <div className={styles.weatherContainer}>
      <WeatherForm onChangeCity={handleOnChangeCity} />
      {loading ? (
        <Loading />
      ) : weather ? (
        <WeatherMainInfo weather={weather} />
      ) : (
        <div>No se encontraron datos de clima.</div>
      )}
    </div>
  );
}
