import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import "./InfoModal.scss";


const InfoModal = ({ setIsOpen, currentOrder }) => {

    const [id, setId] = useState(currentOrder.id)

    // Changes order status to completed
    const completeOrder = () => {
        axios.patch(`http://localhost:5000/orders/${id}`, {
        orderStatus: 'Completed'
    })
    window.location.reload(true);
    }

    // Changes order status to declined
    const declineOrder = () => {
        axios.patch(`http://localhost:5000/orders/${id}`, {
        orderStatus: 'Declined'
    })
    window.location.reload(true);
    }

  return (
    <>
    <div className='darkBG' onClick={() => setIsOpen(false)} />
    <div className="modalContainer">
        <div className="modalContent">
            <h2 className="modalHeader">Edit the order</h2>
            <span className="xBtn" onClick={() => setIsOpen(false)}></span>
        </div>
        <div className="modalContent">
        <TableContainer className="table" component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell><b>Ordered items:</b></TableCell>
                    <TableCell><b>Quantity:</b></TableCell>
                    <TableCell><b>Price:</b></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {currentOrder.itemInfo.map((items, index) => (
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">{items[0]}</TableCell>
                        <TableCell component="th" scope="row">{items[1]}</TableCell>
                        <TableCell component="th" scope="row">${items[2] * items[1]}.00</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            <h3>Total amount: ${currentOrder.amount}.00</h3>
            <button className="completeOrderBtn" onClick={ completeOrder }>Complete the order</button>
            <button className="declineOrderBtn" onClick={ declineOrder }>Decline the order</button>
        </div>
    </div>
    </>
  )
};

export default InfoModal;
