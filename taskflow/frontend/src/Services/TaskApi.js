import axios from 'axios'
const url = import.meta.env.VITE_API_URL_TASKS

export async function getAllTasks() {
    const allTask = await axios.get(`${url}/tasks`,{withCredentials:true})
    return allTask;
}

export async function newTask(task) {
    return await axios.post(`${url}/`, { task }, { headers: { 'Content-Type': 'application/json' },withCredentials:true })
}

export async function deleteTask(id) {
    return await axios.delete(`${url}/delete/${id}`, {headers: { 'Content-Type': 'application/json' },withCredentials:true })
}

export async function updateTask(id , task) {
    return await axios.patch(`${url}/update/${id}`, { task }, { headers: { 'Content-Type': 'application/json' },withCredentials:true })
}

export async function updateCompleted(id, completed) {
    return await axios.patch(`${url}/completed/${id}`, { completed }, { headers: { 'Content-Type': 'application/json' },withCredentials:true });
}