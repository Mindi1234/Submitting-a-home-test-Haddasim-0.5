import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, login2 } from '../slices/LoginSlice';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

export default function Login() {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Signup');
  };

  const handleLogin = async (e) => {
    const phoneRegex = /^[0-9]+$/
    if (!phoneRegex.test(phoneNumber)) {
      alert("phone number in numbers pleas!!")
      return
    }
    e.preventDefault();
    const user = { phoneNumber: phoneNumber };

    try {
      const response = await dispatch(login(user));
      if (login.fulfilled.match(response)) {
        console.log(response.payload);
        navigate('/managerPage');
      } else if (login.rejected.match(response)) {
        const error = response.payload || 'Unknown error';
        if (error.status === 404) {
          const response2 = await dispatch(login2(user));
          if (login2.fulfilled.match(response2)) {
            console.log(response2.payload);
            const supplier = response2.payload;
            navigate('/supplierPage');
          } else {
            navigate('/Signup');
          }
        } else {
          console.log('Connection error!');
        }
      }
    } catch (error) {
      console.error('Unexpected error in login:', error);
    }
  };

  return (
<Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh', 
      width: '70vw',
      backgroundImage: 'url("src/assets/Abandoned shopping Cart Recovery.gif")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  >
      <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: 3, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom color="#ff9800">
          LogIn
        </Typography>
        <TextField
          label="Enter phone number please!"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: '#ffb300',
              color: 'white',
              '&:hover': {
                backgroundColor: '#ffa000',
              },
              marginRight: 1,
            }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={handleClick}
            sx={{
              borderColor: '#ff9800',
              color: '#ff9800',
              '&:hover': {
                backgroundColor: '#ffe0b2',
              },
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </Box>
  );
}