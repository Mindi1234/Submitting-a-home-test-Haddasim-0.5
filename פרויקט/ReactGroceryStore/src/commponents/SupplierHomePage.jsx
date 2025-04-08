import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"
import { OrdersSupplier, changeOrder } from '../slices/OrderSlice'
import { Container,Typography,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,createTheme,ThemeProvider,Box,} from '@mui/material'
import { green, red, blue } from '@mui/material/colors'
import { orange } from '@mui/material/colors'
import { styled } from '@mui/material/styles'
const theme = createTheme({
  palette: {
      primary: {
        main: orange[300],},
      secondary: {
        main: orange[500],},
  },
  typography: {
      h4: {
          fontWeight: 'bold',
          color: orange[700],
          marginBottom: '16px',
    }},
})
const darkOrange = orange[700];

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: darkOrange
}))

const StyledTableCell = styled(TableCell)(({ theme, status }) => ({
  ...(status === 'completed' && {
      backgroundColor: green[100],
      color: green[700]}),
  ...(status === 'waiting' && {
      backgroundColor: red[100],
      color: red[700]}),
  ...(status === 'inProgress' && {
        backgroundColor: blue[100],
        color: blue[700],
    })
  }))

const StyledButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
}))


export default function SupplierHomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const orders = useSelector(state => state.order.orders||[])
  const id = useSelector(state => state.user.user.id)
  const sup =useSelector(state => state.user.user)

  const [viewCompletedOrders, setViewCompletedOrders] = useState(false)
  const completedOrders = orders.filter((order) => String(order.status) === 'completed')

  useEffect(() => {
    if (id) {
      dispatch(OrdersSupplier({ id }));
    }
  }, [dispatch, id]);

  const addproduct = () => {
    navigate("/addproduct");
  }
  const backToLogin = () => {
    navigate("/");
  }
  const seeCompletedOrders = () => {
    setViewCompletedOrders(true)
  }
  const goBackToAllOrders = () => {
    setViewCompletedOrders(false)
  }
  const handleApproveOrder = (order) => {
    dispatch(changeOrder(order));
    dispatch(OrdersSupplier({ id }));
 
  }

  
  
  return (
    <ThemeProvider theme={theme}>
        <Container>
        <Button variant="outlined" color="primary" onClick={backToLogin} sx={{ mr: 2 }}>
                    back to loginPage </Button>
            <Typography variant="h4">supplier {sup.supplierName}</Typography>
            <Box sx={{ mb: 2 }}>
                <Button variant="outlined" color="primary" onClick={addproduct} sx={{ mr: 2 }}>
                    New product</Button>
                    {!viewCompletedOrders && (
                        <Button variant="outlined" color="primary" onClick={seeCompletedOrders} sx={{ marginLeft: 2 }}>
                            Completed Orders</Button> )}
                    {viewCompletedOrders && (
                        <Button variant="outlined" onClick={goBackToAllOrders} sx={{ marginLeft: 2 }}>
                            Back to All Orders </Button>  )}
            </Box>
            <Paper>
                <Typography variant="h6" style={{ padding: '16px' }}>
                    {viewCompletedOrders ? 'completed orders' : 'all the orders'}</Typography>
                <TableContainer>
                    <Table>
                    <TableHead>
                      <TableRow>
                          <StyledTableHeaderCell>status</StyledTableHeaderCell>
                          <StyledTableHeaderCell>date</StyledTableHeaderCell>
                          {!viewCompletedOrders && <StyledTableHeaderCell align="right">פעולות</StyledTableHeaderCell>}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {viewCompletedOrders ?(
                            completedOrders.map((order) => (
                                <TableRow key={order.id}>
                                <StyledTableCell status={order.status}>{order.status}</StyledTableCell>
                                <TableCell>{order.date}</TableCell>
                                </TableRow>))
                            ):(orders.map((order) => (
                                <TableRow key={order.id}>
                                <StyledTableCell status={order.status}>{order.status}</StyledTableCell>
                                <TableCell>{order.date}</TableCell>
                                        {order.status === 'waiting' &&(
                                        <TableCell align="right">
                                        <StyledButton variant="contained" color="primary" onClick={() => handleApproveOrder(order)}>
                                          Approve </StyledButton>
                                        </TableCell>)}
                                </TableRow>))
                            )}
                    </TableBody>
                    </Table>
                </TableContainer>
                {(viewCompletedOrders && completedOrders.length === 0) && (
                   <Typography variant="subtitle1" style={{ padding: '16px' }}>no completed orders</Typography>
                )}
                {(!viewCompletedOrders && orders.length === 0) && (
                  <Typography variant="subtitle1" style={{ padding: '16px' }}>no orders</Typography>
                )}
            </Paper>
        </Container>
    </ThemeProvider>
  )
}
