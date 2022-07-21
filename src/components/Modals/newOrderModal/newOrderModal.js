import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import './newOrderModal.scss';

const OrderModal = ({ setIsOpened }) => {
  const [foods, setFoods] = useState(); 
  const [items, setItems] = useState('Creamy Tomato Pasta,19');
  const [qty, setQTY] = useState('1');
  const [values, setValues] = useState([]);
  const [amount, setAmount] = useState(0);
  const [employee, setEmployee] = useState('Alex');
  const [table, setTable] = useState(1);
  const [row, setRow] = useState(1);

  // Function submits chosen item and prepares realted info
  const handleClick = () => {
    let obj =[items];
    let cutObj = obj[0].split(',');
    let count = Number(qty) * Number(cutObj[1]);
    setValues(current => [...current, [cutObj[0], Number(qty), Number(cutObj[1])]]);
    setAmount(amount + Number(count));
  };

  // Function removes sumbited item from the order
  const remove = (index, valueCount) => {
    setValues([...values.slice(0, index), ...values.slice(index + 1)]);
    setAmount(amount - (valueCount[1] * valueCount[2]));
  };
  
  // Function prepares order info for db pushing
  const prepareInfo = () => {
    let time = new Date();
    let hours = (time.getHours() < 10 ? '0' : '') + time.getHours() + ':' + (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();

    let info = {
      itemInfo: values,
      employee: employee,
      table: table,
      row: row,
      time: hours,
      amount: amount,
      orderStatus:'Active'
    };
    return info;
  }

  // Function pushes the order to db
  const postInfo = () => {
    axios.post('http://localhost:5000/orders', prepareInfo())
    setIsOpened(false);
    window.location.reload(true);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/items').then((response) => {
      setFoods(response.data)
    });
  }, []);

  return (
    <>
    <div className='darkBG' onClick={() => setIsOpened(false)} />
    <div className="newOrder">
      <div className="orderContent">
        <div>
          <h2>Select a table</h2>
          <form>
            <select name="table" onChange={(e) => setTable(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
            </select>
          </form>
        </div>
        <div>
          <h2>Select a row</h2>
          <form>
            <select name="row" onChange={(e) => setRow(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </form>
        </div>
        <div>
          <h2>Select employee name</h2>
          <form>
            <select name="employee" onChange={(e) => setEmployee(e.target.value)}>
              <option value="Alex">Alex</option>
              <option value="John">John</option>
              <option value="Max">Max</option>
              <option value="Jared">Jared</option>
            </select>
          </form>
        </div>
        <div>
          <h2>Choose your item and quantity</h2>
          <form>
            <select className="selectItem" onChange={(e) => setItems(e.target.value)}>
            {foods && foods.map((food) => (
              <option key={food.amount} value={[food.name, food.amount]}>{food.name}</option>
            )
            )};
            </select>
            <select className="quantitySelect" onChange={(e) => setQTY(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          </form>
          <button className="submitItem" onClick={ handleClick }>Submit</button>
        </div>
      </div>
      <TableContainer className="orderTable" component={Paper}>
        <Table size="small" aria-label="a dense table">
            <TableHead>
            <TableRow>
              <TableCell><b>Item</b></TableCell>
              <TableCell align="right"><b>Quantity</b></TableCell>
              <TableCell align="right"><b>Price</b></TableCell>
              <TableCell align="right"><b>Total price</b></TableCell>
          </TableRow>
          </TableHead>
          <TableBody>
            {values.map((value, index) => ( 
              <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell component="th" scope="row">
                {value[0]}
              </TableCell>
              <TableCell align="right">{value[1]}</TableCell>
              <TableCell align="right">${value[2]}.00</TableCell>
              <TableCell align="right">${value[2] * value[1]}.00</TableCell>
              <TableCell className='deleteBtn' align="center" onClick={() => remove(index, value)}>Delete</TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>
          <div className="amount">
              <h3>Total amount: ${amount}.00</h3>
          </div>
          {values.length > 0 ? <button className="newOrderBtn" onClick={ postInfo }>Create an order</button> : null}      
    </div>
    </>
  )
};

export default OrderModal;
