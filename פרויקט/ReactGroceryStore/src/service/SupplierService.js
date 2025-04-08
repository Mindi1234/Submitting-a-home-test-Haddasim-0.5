import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';

export const getAllSuppliers = async () => {
    try {
        console.log("service");

        const response = await axios.get("http://localhost:8080/api/supplier/getAllSupplier");
        console.log('response', response.data);
        return response.data; 
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}


export const getSupplier = async (Id) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/supplier/getSupplierById/${Id}`);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

export const signupSupplier = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/supplier/signup', formData,);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

export const addProduct = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/product/addProduct', formData,);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

