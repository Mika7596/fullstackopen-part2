import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'
import './App.css'

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [weather, setWeather] = useState({temperature:"", wind:""});
  const [oneCountryToShow, setOneCountryToShow] = useState(false);

  useEffect(()=>{
    countriesService.getAll().then(resp => setAllCountries(resp.data));

  }, [])



  const handleShow = event =>{
    console.log(event.target.value);
    countriesService.getOneCountry(event.target.value).then(resp => setAllCountries([resp.data]))
  }

async function getWeather(city) {
    const resp = await weatherService(city);
    const temperature = resp.data.main.temp;
    const wind = resp.data.wind.speed;
    console.log("Temperatura:", temperature);
    console.log("Viento:", wind);
    setWeather({temperature, wind});
  
}

  const oneCountryData = (country) => {
    getWeather(country.capital)
    return (<><h2>{country.name.common}</h2><p>Capital: {country.capital}</p><p>Area:{country.area}</p><h4>Languages</h4>{Object.values(country.languages).map(lang => (<li>{lang}</li>))}<div><img src={country.flags.png}/></div><div><p>Temperature: {weather.temperature}</p> <p>Wind: {weather.wind}</p></div></>)
  }

  return (
    <>
    <h1>Find countries!</h1>
    <p>Start to type to find countries...</p>
    <input type="text" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
    <hr />
    {allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLocaleLowerCase())).length >= 10 ? (<div>Too many matches, please specify another filter.</div>):
    allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLocaleLowerCase())).length ===1 ? (<div>{allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLocaleLowerCase())).map(country => oneCountryData(country))}</div>):
    (
      <div>{allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLocaleLowerCase())).map(country => (<div style={{display:"flex"}}><li>{country.name.common}</li><button value={country.name.common} onClick={handleShow}>Show</button></div>))}</div>
    ) }

    </>
  )
}

export default App
