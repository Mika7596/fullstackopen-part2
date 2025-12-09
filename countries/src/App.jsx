import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import './App.css'

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  useEffect(()=>{
    countriesService.getAll().then(resp => setAllCountries(resp.data));
  }, [])


  return (
    <>
    <h1>Find countries!</h1>
    <p>Start to type to find countries...</p>
    <input type="text" value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
    <hr />
    {allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLocaleLowerCase())).length >= 10 ? (<div>Too many matches, please specify another filter.</div>):
    allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLocaleLowerCase())).length ===1 ? (<div>{allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLocaleLowerCase())).map(country => (<><h2>{country.name.common}</h2><p>Capital: {country.capital}</p><p>Area:{country.area}</p><h4>Languages</h4>{Object.values(country.languages).map(lang => (<li>{lang}</li>))}<div><img src={country.flags.png}/></div></>))}</div>):
    (
      <div>{allCountries.filter(country => country.name.common.toLowerCase().includes(searchValue.toLocaleLowerCase())).map(country => (<li>{country.name.common}</li>))}</div>
    ) }

    </>
  )
}

export default App
