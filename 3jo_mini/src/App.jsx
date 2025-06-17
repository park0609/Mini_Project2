import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import { Button } from './pages/Button';
import Chart from './pages/Chart';


function App() {


  return (
    <>
      {/* <Router> */}
      <Navbar />
      <Chart />
      <Routes>
        <Route path='/' exact />
      </Routes>
      {/* </Router> */}
    </>
  );
}
export default App;