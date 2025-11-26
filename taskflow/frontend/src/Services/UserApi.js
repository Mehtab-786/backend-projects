import axios from 'axios'
const url = import.meta.env.VITE_API_URL_USER

export async function createAccount(data) {
    const user = await axios.post(`${url}/register`, {
        'email': data.email,
        'password': data.password,
        'username': data.username
    }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
    return user;
};

export async function loginAccount(data) {
    const user = await axios.post(`${url}/login`, {
        'email': data.email,
        'password': data.password,
    }, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
    return user;
};


export async function fetchCurrentUser() {
    const resp = await axios.post(`${url}/checkuser`, {}, { headers: { 'Content-Type': 'application/json'}, withCredentials: true });
    return resp
};


export async function logoutAccount() {
    return await axios.post(`${url}/logout`, { headers: { 'Content-Type': 'application/json' }, withCredentials: true });
}