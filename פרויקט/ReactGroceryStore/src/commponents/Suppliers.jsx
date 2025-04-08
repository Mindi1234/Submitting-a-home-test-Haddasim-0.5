import React ,{ useEffect, useState } from 'react'
import {useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { AllSuppliers } from '../slices/SuppliersSlice'
import { Button, Typography, Box } from '@mui/material'

const supplierButton = {
    backgroundColor:'#FFE0B2', 
    border:'1px solid #FFB74D',
    borderRadius:'5px',
    padding:'10px 15px',
    margin:'8px',
    textAlign: 'left',
    cursor: 'pointer',
    color:'#000000',
    display:'flex',
    flexDirection:'column', 
    alignItems:'flex-start'
  }
  const container = {
    display:'flex',
    flexWrap:'wrap',
    gap:'16px', 
  }
  const imageStyle = {
    
  }

export default function Suppliers(){

    const dispatch = useDispatch()
    const suppliers = useSelector((state) => state.supplier.suppliers || [])
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/newOrder/${id}`)
    }
     
    useEffect(() => {
        const fetchData = async () => {
            console.log("worked",suppliers)
            const res = await dispatch(AllSuppliers())
            console.log('res!', res)
        }
        fetchData()
    }, [dispatch])


    return (
        <div>
          <Typography variant="h4">
            All Suppliers
          </Typography>
          {suppliers.length === 0 ? (
            <Typography variant="h6">No suppliers available</Typography>
          ) : (
            <Box sx={container}>
              {suppliers.map((supplier) => (
                <Button
                  key={supplier.id}
                  variant="contained"
                  style={supplierButton}
                  onClick={() => handleClick(supplier.id)}>
                  <Typography variant="subtitle1" component="div" style={{color:'#000000'}}>
                    <strong>Name:</strong>{supplier.supplierName}
                  </Typography>
                  <Typography variant="body2" component="div" style={{color:'#000000'}}>
                    <strong>Cmpany:</strong>{supplier.supplierCompany}
                  </Typography>
                  <Typography variant="body2" component="div" style={{color:'#000000'}}>
                    <strong>PhoneNumber:</strong>{supplier.phoneNumber}
                  </Typography>
                </Button>
              ))}
            </Box>
          )}
           <img src="src/assets/Food Shop Sticker by Healthy Living Market - Find & Share on GIPHY.gif" 
           alt="Bottom Image" 
           style={{
            width:'50%', 
            maxWidth: '600px', 
            height: 'auto', 
            display:'block',
            margin:'20px auto 0'}} />
        </div>
      )

}