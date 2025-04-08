import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';




export const loginManager = async (user) => {
    try {
        const response = await axios.post('http://localhost:8080/api/manager/login', user);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

export const loginSupplier = async (user) => {
    try {
        const response = await axios.post('http://localhost:8080/api/supplier/login', user);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}