import React, { useState, useEffect } from 'react'
import FeaturedInfo from './FeaturedInfo/FeaturedInfo';
import Table from './Table/Table';
import OrderModal from '../Modals/newOrderModal/newOrderModal';
import axios from "axios";
import './Home.scss';

function Home() {
    const [isOpened, setIsOpened] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get('http://localhost:5000/orders').then((response) => {
            setData(response.data);
        });
    }, []);

    return (
        <div className='home'>
            <FeaturedInfo data={data} />
            <Table data={data} />
            <button className='addOrder' onClick={() => setIsOpened(true)}>New order +</button>
            {isOpened && <OrderModal setIsOpened={ setIsOpened } />}
        </div>
    )
}

export default Home;
