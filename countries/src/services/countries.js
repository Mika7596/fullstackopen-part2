import axios from 'axios'
function getAll () {
  return  axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
}


export default {getAll}