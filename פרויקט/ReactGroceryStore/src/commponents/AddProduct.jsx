import React ,{ useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addproduct } from '../slices/SuppliersSlice'
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


export default function AddProduct(){
    const dispatch = useDispatch()
    const [productName, setProductName] = useState('')
    const [pricePerItem, setPricePerItem] = useState('')
    const [minQuantity, setMinQuantity] = useState('')
    const currentsupplier = useSelector(state => state.supplier.supplier)
    console.log(currentsupplier)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!productName || !pricePerItem || !minQuantity) {
            alert("please fill all the fields!")
            return
        }
        const productData = {
          productName,
          pricePerItem,
          minQuantity,
          supplier:currentsupplier
        }
    
        const response = await dispatch(addproduct(productData))
        setProductName('')
        setPricePerItem('')
        setMinQuantity('')
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
            height: '70vh', 
            width: '45vw',
            right: '20%',
            backgroundImage: 'url("src/assets/Shopping List.gif")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            }}
        >
            <Typography component="h2" variant="h2">
                New Product </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        type="text"
                        fullWidth
                        id="productName"
                        label="product name"
                        name="productName"
                        autoFocus
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                    />
                
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        name="price per item"
                        label="price per item"
                        id="pricePerItem"
                        value={pricePerItem}
                        onChange={(e) => setPricePerItem(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        type="number"
                        id="minQuantity"
                        label="min quantity"
                        name="min quantity"
                        value={minQuantity}
                        onChange={(e) => setMinQuantity(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        ADD PRODUCT
                    </Button>
                </Box>
            </Box>
        </Container>
        </ThemeProvider>
        )
    
    

}