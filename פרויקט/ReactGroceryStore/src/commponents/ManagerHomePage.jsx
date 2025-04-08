import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AllOrders } from '../slices/ManagerSlice'
import { changeOrder } from '../slices/OrderSlice'
import {Container,Typography,Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,createTheme,ThemeProvider} from '@mui/material'
import { green, blue, red, orange, yellow } from '@mui/material/colors'
import { styled } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: orange[300],
        },
        secondary: {
            main: yellow[300],
        },
    },
})

const darkOrange = '#FFA500'

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
    fontWeight: 'bold',
    color: darkOrange,
}))

const StyledTableCell = styled(TableCell)(({ theme, status }) => ({
    ...(status === 'completed' && {
        backgroundColor: green[100],
        color: green[700],
    }),
    ...(status === 'inProgress' && {
        backgroundColor: blue[100],
        color: blue[700],
    }),
    ...(status === 'waiting' && {
        backgroundColor: red[100],
        color: red[700],
    })
}))

const StyledButton = styled(Button)(({ theme }) => ({
    marginLeft: theme.spacing(1),
}))


export default function ManagerHomePage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orders = useSelector((state) => state.manager.orders || [])
    const [viewCompletedOrders, setViewCompletedOrders] = useState(false)
    const completedOrders = orders.filter((order) => String(order.status) === 'completed')

    const newOrder = () => {
        navigate('/suppliers')
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

    useEffect(() => {
        const fetchData = async () => {
            console.log('worked', orders)
            const res = await dispatch(AllOrders())
            console.log('res!', res)
        }
        fetchData()
    }, [dispatch])

    const handleApproveOrder = (order) => {
        dispatch(changeOrder(order))
        dispatch(AllOrders())
    }

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <Button variant="outlined" color="primary" onClick={backToLogin} sx={{ mr: 2 }}>
                    back to loginPage </Button>
                    <Button variant="outlined" color="primary" onClick={newOrder} sx={{ marginLeft: 2 }}>
                        New Order </Button>
                    {!viewCompletedOrders && (
                        <Button variant="outlined" color="primary" onClick={seeCompletedOrders} sx={{ marginLeft: 2 }}>
                            Completed Orders</Button> )}
                    {viewCompletedOrders && (
                        <Button variant="outlined" onClick={goBackToAllOrders} sx={{ marginLeft: 2 }}>
                            Back to All Orders </Button>  )}
                </div>
                <Paper>
                    {viewCompletedOrders ? (
                        <>
                            <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: darkOrange }}>
                                Completed Orders </Typography>
                            {completedOrders.length === 0 ? (
                                <Typography variant="subtitle1">No completed orders yet</Typography>):(
                            <TableContainer>
                                <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                                        <StyledTableHeaderCell>Date</StyledTableHeaderCell>
                                        <StyledTableHeaderCell>Supplier</StyledTableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {completedOrders.map((order) => (
                                    <TableRow key={order.id}>
                                    <StyledTableCell status={order.status}>
                                        {order.status}
                                         </StyledTableCell>
                                         <TableCell>{order.date}</TableCell>
                                         <TableCell>{order.supplier? order.supplier.supplierName:'no supplier!!!'}</TableCell>
                                    </TableRow>
                                    ))}
                                </TableBody>
                                </Table>
                                </TableContainer>  )}
                        </> ):(
                        <>
                        <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', color: darkOrange }}>
                            All orders </Typography>
                        {orders.length === 0 ? (
                            <Typography variant="subtitle1">you have no orders yet</Typography>):(
                            <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableHeaderCell>Status</StyledTableHeaderCell>
                                        <StyledTableHeaderCell>Date</StyledTableHeaderCell>
                                        <StyledTableHeaderCell>Supplier</StyledTableHeaderCell>
                                        <StyledTableHeaderCell align="right">Actions</StyledTableHeaderCell>
                                    </TableRow>
                                </TableHead>
                            <TableBody>
                            {orders.map((order) => (
                                <TableRow
                                    key={order.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <StyledTableCell component="th" scope="row" status={order.status}>{order.status} </StyledTableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>{order.supplier ? order.supplier.supplierName : 'No Supplier'}</TableCell>
                                            <TableCell align="right">
                                            {String(order.status) === 'inProgress' && (
                                            <StyledButton variant="contained" color="primary" onClick={() => handleApproveOrder(order)}>
                                                Approve Order </StyledButton>
                                            )}
                                        </TableCell>
                                </TableRow>))}
                            </TableBody>
                            </Table>
                            </TableContainer>)}
                        </> )}
                </Paper>
            </Container>
        </ThemeProvider>
    )
}