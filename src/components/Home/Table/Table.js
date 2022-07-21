import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoModal from '../../Modals/MoreInfoModal/InfoModal';
import './Table.scss';

function OrdersTable({ data }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentOrder, setCurrentOrder] = useState();
    
    // 4 lines below sort table information 
    let statusOrder = ['Active', 'Completed', 'Declined'];
    data?.sort(function(a, b) {
    return statusOrder.indexOf(a.orderStatus) - statusOrder.indexOf(b.orderStatus);
    });

    return (
        <div className='orderTable'>
            {data?.length === 0 ? <h1 className='NoOrdersTitle'>No orders yet :(</h1> :
            <TableContainer className="table" component={Paper}>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                <TableRow>
                    <TableCell><b>Status:</b></TableCell>
                    <TableCell align="right"><b>Row:</b></TableCell>
                    <TableCell align="right"><b>Table:</b></TableCell>
                    <TableCell align="right"><b>Employee:</b></TableCell>
                    <TableCell align="right"><b>Time:</b></TableCell>
                    <TableCell align="right"><b>Amount:</b></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((orderInfo) => (
                    <TableRow className={orderInfo.orderStatus} key={orderInfo.id} onClick={() => setCurrentOrder(orderInfo)}>
                    <TableCell component="th" scope="row">{orderInfo.orderStatus}</TableCell>
                    <TableCell align="right">{orderInfo.row}</TableCell>
                    <TableCell align="right">{orderInfo.table}</TableCell>
                    <TableCell align="right">{orderInfo.employee}</TableCell>
                    <TableCell align="right">{orderInfo.time}</TableCell>
                    <TableCell align="right">${orderInfo.amount}.00</TableCell>
                    {orderInfo.orderStatus !== "Active" ? null : 
                    <TableCell className='moreBtn' align="right" onClick={() => setIsOpen(true)}>More</TableCell>}
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            }
            {isOpen && <InfoModal currentOrder={ currentOrder } setIsOpen={ setIsOpen } />}
        </div>
    );
};

export default OrdersTable;
