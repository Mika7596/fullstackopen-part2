import axios from 'axios';

const baseURL = "http://localhost:3001/persons";

const getAllPeople = () => {
    return axios.get(baseURL)
}

const createPerson = personObj => {
   return axios.post(baseURL, personObj)
}

const deletePerson = personId => {
    return axios.delete(`${baseURL}/${personId}`)
}

const updatePerson = (id, updatedData) => {
    return axios.put(`${baseURL}/${id}`, updatedData)
}

export default {getAllPeople, createPerson, deletePerson, updatePerson}