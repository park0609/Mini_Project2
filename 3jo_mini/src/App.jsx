import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './pages/Navbar';
import { Button } from './pages/Button';
import Voc from './pages/voc/Voc.jsx';
import CommonTable from './pages/table/CommonTable';
import CommonTableRow from './pages/table/CommonTableRow';
import CommonTableColumn from './pages/table/CommonTableColumn';





function App() {


  return (
    <>
      {/* <Router> */}
      <Navbar />
      <Routes>
        <Route path='/' exact />
        <Route path="/voc" element={<Voc />} />
      </Routes>
      {/* </Router> */}
    </>
  );
}
export default App;