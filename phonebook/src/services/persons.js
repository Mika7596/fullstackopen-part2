import axios from 'axios';

const baseURL = "http://localhost:3001/persons";

const getAllPeople = () => {
    return axios.get(baseURL)
}

const createPerson = personObj =>{
   return axios.post(baseURL, personObj)
}

export default {getAllPeople, createPerson}