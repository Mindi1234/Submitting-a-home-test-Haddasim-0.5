import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addsuplier } from '../slices/SuppliersSlice'
import { AllProducts } from '../slices/OrderSlice'
import { TextField,Button,Typography,Container,Box,createTheme,ThemeProvider,} from '@mui/material';

const theme = createTheme({
  palette: {
      primary: {
          main: '#FFB74D',
      },
      secondary: {
          main: '#F57C00', 
      },
  },
  typography: {
      h2: {
          marginBottom: '20px',
          color: '#F57C00',
      },
      button: {
          fontWeight: 'bold',
      }},
  components: {
      MuiTextField: {
      styleOverrides: {
            root: {
            marginBottom: '15px',
      }}},
      MuiButton: {
          styleOverrides: {
          containedPrimary: {
          color: 'white',
           '&:hover': {
             backgroundColor: '#E65100', 
        }}
  }}}
})


export default function Signup(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [supplierName, setSupplierName] = useState('')
    const [supplierCompany, setSupplierCompany] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const products = useSelector((state) => state.order.products)

    useEffect(() => {
        dispatch(AllProducts());
      }, [dispatch])

    const handleSubmit = async (e) => {
        if (!supplierName || !supplierCompany || !phoneNumber) {
            alert("please fill all the fields!")
            return
        }
      const phoneRegex = /^[0-9]+$/
      if (!phoneRegex.test(phoneNumber)) {
        alert("phone number in numbers pleas!!")
        return
    }
    e.preventDefault()
    console.log(products)
    const supplierData = {
      supplierName,
      supplierCompany,
      phoneNumber,
      products: null,
      manager: { id: 1 }
    }

    const response = await dispatch(addsuplier(supplierData))
    const supplier =response
    navigate("/supplierPage")
  }

  return (
    <ThemeProvider theme={theme}>
        <Container maxWidth="sm">
        
            <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '50vh', 
              width: '30vw',
              backgroundImage: 'url("src/assets/🛒 Ecommerce - Royalty-Free GIF - Animated Sticker - Free PNG - Animated Icon.gif")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Typography component="h2" variant="h2">
                Supplier SignUp </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="supplierName"
                        label="Name"
                        name="supplierName"
                        autoFocus
                        value={supplierName}
                        onChange={(e) => setSupplierName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="supplierCompany"
                        label="Company"
                        name="supplierCompany"
                        value={supplierCompany}
                        onChange={(e) => setSupplierCompany(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="phoneNumber"
                        label="PhoneNumber"
                        id="phoneNumber"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        SIGN UP
                    </Button>
                </Box>
            </Box>
        </Container>
    </ThemeProvider>
)
}