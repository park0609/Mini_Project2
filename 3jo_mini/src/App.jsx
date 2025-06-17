import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home'
import Login from './pages/Login';


function App() {


  return (
    <>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} /> {/*메인 페이지*/}
        <Route path='/Login' element={<Login />} /> {/*로그인 페이지*/}
      </Routes>

    </>
  );
}
export default App;