import React, { useRef, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Login from './pages/Login';
import Searchuser from './pages/Searchuser';
import Mypage from './pages/Mypage';
import Modifyprofile from './pages/Modifyprofile'
import './App.css'
import Board from './Board';
import { Button } from './components/Button';


function App() {
  const navRef = useRef(null);

  const handleScroll = () => {
    if (!navRef.current) return;

    if (window.scrollY > 0) {
      navRef.current.style.position = "fixed";
      navRef.current.style.top = "0";
      navRef.current.style.left = "0";
      navRef.current.style.width = "100%";
      navRef.current.style.zIndex = "999";
    } else {
      navRef.current.style.position = "static";
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      <div ref={navRef}>
        <Navbar />
      </div>


      <Routes>
        <Route path='/' element={<Home />} /> {/*메인 페이지*/}
        <Route path='/Login' element={<Login />} /> {/*로그인 페이지*/}
        <Route path='/Searchuser' element={<Searchuser />} /> {/* 아이디/비번찾기페이지 */}
        <Route path='/Mypage' element={<Mypage />} /> {/* 마이페이지 */}
        <Route path='/Mypage/Modifyprofile' element={<Modifyprofile />} /> {/* 회원정보수정페이지 */}
        <Route path='/board' element={<Board />} /> {/* 게시판페이지 */}
      </Routes>

    </>
  );
}
export default App;