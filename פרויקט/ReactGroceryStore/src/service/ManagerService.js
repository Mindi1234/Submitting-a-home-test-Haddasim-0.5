import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';


export const getAllOrders = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/manager/getAllOrders/1`);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
