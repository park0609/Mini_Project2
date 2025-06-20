import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Chart from './Chart';

const Home = () => {
    return (
        <>
            <Chart />
            <Routes>
                <Route path='/' exact />
            </Routes>
        </>
    )
}
export default Home