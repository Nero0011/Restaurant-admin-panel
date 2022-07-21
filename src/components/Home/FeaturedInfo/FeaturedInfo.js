import React, { useState, useEffect } from 'react';
import axios from "axios";
import './FeaturedInfo.scss';

function FeaturedInfo({ data }) {
   const [active, setActive] = useState();
   const [completed, setCompleted] = useState();
   const [declined, setDeclined] = useState();
   const [amountData, setAmountData] = useState(0);
   const [declinedAmount, setDeclinedAmount] = useState(0);

   useEffect(() => {
    axios.get('http://localhost:5000/orders?orderStatus=Active').then((response) => {
        setActive(response.data);
    });
    axios.get('http://localhost:5000/orders?orderStatus=Completed').then((response) => {
        setCompleted(response.data);
    });
    axios.get('http://localhost:5000/orders?orderStatus=Declined').then((response) => {
        setDeclined(response.data);
    });
}, []);

    useEffect(() => {
        let amount = 0;
        data?.map((dataItem) => {
           return amount = amount + dataItem.amount;
        })
        setAmountData(amount);
    }, [data]);
    
    useEffect(() => {
        let declinedAmount = 0;
        declined?.map((declinedItem) => {
           return declinedAmount = declinedAmount + declinedItem.amount;
        })
        setDeclinedAmount(declinedAmount);
    }, [declined]);

  return (
    <div className='featured'>
        <div className='featuredItem'>
            <span className='featuredTitle'>Orders:</span>
            <div className='featuredMoneyContainer'>
                <span className='featuredMoney'>{data?.length} Orders</span>
                <span className='featuredMoneyRate'>
                    {active?.length} {active?.length === 1 ? 'Active order' : 'Active orders'} / {<br/>}
                    {completed?.length} {completed?.length === 1 ? 'Completed order' : 'Completed orders'}
                </span>
            </div>
            <span className='featuredSub'>Compared to last 24h</span>
        </div>
        <div className='featuredItem'>
            <span className='featuredTitle'>Declined orders:</span>
            <div className='featuredMoneyContainer'>
                <span className='featuredMoney'>{declined?.length}</span>
                <span className='featuredMoneyRate'>{declined?.length === 1 ? 'Declined order' : 'Declined orders'}</span>
            </div>
            <span className='featuredSub'>Compared to last 24h</span>
        </div>
        <div className='featuredItem'>
            <span className='featuredTitle'>Revanue:</span>
            <div className='featuredMoneyContainer'>
                <span className='featuredMoney'>${amountData - declinedAmount}.00</span>
                <span className='featuredMoneyRate'>Declined orders amount: ${declinedAmount}.00</span>
            </div>
            <span className='featuredSub'>Compared to last 24h</span>
        </div>
    </div>
  )
}

export default FeaturedInfo;
