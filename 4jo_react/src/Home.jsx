// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Chart from './pages/Chart.jsx';
import Calendar from './pages/calendar.jsx';
// import App from './App.jsx';

const Home = () => {
    return (
        <>
            <Calendar />
            <Chart />

        </>
    )
}
export default Home