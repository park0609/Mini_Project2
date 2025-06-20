import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Chart from './Chart';
import Calender from './calendar';

const Home = () => {
    return (
        <>
            <Calender />
            <Chart />
            <Routes>
                <Route path='/' exact />
            </Routes>
        </>
    )
}
export default Home