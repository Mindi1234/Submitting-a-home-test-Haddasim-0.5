import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SupplierProducts, addOrder } from '../slices/OrderSlice';
import { getsupplier } from '../slices/SuppliersSlice'
import { Typography, Button, Box } from '@mui/material';

const productButtonStyle = (isSelected) => ({
    backgroundColor: isSelected ? '#C8E6C9' : '#FFE0B2',
    color: '#000000',
    border: '1px solid #FFB74D',
    borderRadius: '5px',
    padding: '10px',
    margin: '4px',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '&:hover': {
        backgroundColor: isSelected ? '#A5D6A7' : '#FFCC80',
    },
    width: '200px',
});

const productListStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '10px',
};

const submitButtonStyle = {
    backgroundColor: '#1976D2',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
    border: 'none',
    '&:hover': {
        backgroundColor: '#1565C0',
    },
}

export default function NewOrder(){

    const { id } = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const products = useSelector((state) => state.order.products || [])
    const supplier = useSelector((state) => state.supplier.supplier || {})
    const [selectedProducts, setSelectedProducts] = useState([])

    useEffect(() => {
        if (id) {
            isNaN(id)
            dispatch(SupplierProducts({id}))
            dispatch(getsupplier({id}))
        }
    }, [dispatch, id])

    const handleAddProduct = (product) => {
        if (!selectedProducts.some((p) => p.id === product.id)) {
            setSelectedProducts([...selectedProducts, product]);
        }
    }

    const handleRemoveProduct = (product) => {
        setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id))
    }

    const handleProductButtonClick = (product) => {
        if (selectedProducts.some((p) => p.id === product.id)) {
            handleRemoveProduct(product)
        } else {
            handleAddProduct(product)
        }
        console.log(selectedProducts);
    }

    const handleOrderSubmit = () => {
        if(!selectedProducts){
            alert("please choose products!!")
            return
        }
        const orderData = {
            status: null,
            date: null, 
            products: selectedProducts,
            supplier: { id: supplier.id },
            manager: { id: 1 }
        };
        const res = dispatch(addOrder(orderData));
        console.log(res);
        navigate('/managerPage');
    }
    return (
     
            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: (theme) => theme.spacing(3),
                    borderRadius: '8px',
                    maxWidth: '800px', 
                    width: '100%',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    New Order from Supplier
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {supplier.supplierName}
                </Typography>
                {products.length === 0 ? (
                    <Typography variant="h6">No products available</Typography>
                ) : (
                    <Box sx={productListStyle}>
                        {products.map((product) => {
                            const isSelected = selectedProducts.some((p) => p.id === product.id);
                            return (
                                <Button
                                    key={product.id}
                                    variant="contained"
                                    style={productButtonStyle(isSelected)}
                                    onClick={() => handleProductButtonClick(product)}
                                >
                                    <Typography variant="subtitle2" component="div">
                                        <strong>Name:</strong> {product.productName}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        <strong>Price:</strong> {product.pricePerItem}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        <strong>Min Quantity:</strong> {product.minQuantity}
                                    </Typography>
                                </Button>
                            );
                        })}
                    </Box>
                )}
                {selectedProducts.length > 0 && (
                    <Typography variant="subtitle1" mt={2}>
                        Selected Products: {selectedProducts.map(p => p.productName).join(', ')}
                    </Typography>
                )}
                <Button onClick={handleOrderSubmit} style={submitButtonStyle} variant="contained">
                    Submit Order
                </Button>
            </Box>
    )
}


