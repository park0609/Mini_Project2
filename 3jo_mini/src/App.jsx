import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import { Button } from './pages/Button';


function App() {


  return (
    <>
      {/* <Router> */}
      <Navbar />
      <Routes>
        <Route path='/' exact />
      </Routes>
      {/* </Router> */}
    </>
  );
}
export default App;