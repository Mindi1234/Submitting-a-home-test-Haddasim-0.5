import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Accept'] = 'application/json';


export const getSupplierProducts =async (userId) => {
    try{
        const response = await axios.get(`http://localhost:8080/api/product/getAllProductsBySupplierId/${userId}`);
        console.log( response.data)
        return response.data;
        
    }catch(err){
        console.log('err',err);
        throw err;
    }

}

export const AddOrder = async (formData) => {
    try {
        const response = await axios.post('http://localhost:8080/api/order/addOrder', formData,);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

export const getAllProducts = async () => {
    try {
        console.log("service");

        const response = await axios.get("http://localhost:8080/api/product/getAllProducts");
        console.log('response', response.data);
        return response.data; 
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}

export const getOrdersBySupplier = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/order/getOrdersBySupplier/${userId}`);
        console.log('response', response.data);
        return response.data;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}


export const ChangeStatusOrder = async (formData) => {
    try {
        const response = await axios.put('http://localhost:8080/api/order/orderingProcess', formData,);
        console.log('response', response);
        return response;
    } catch (err) {
        console.log('err', err);
        throw err;
    }
}
