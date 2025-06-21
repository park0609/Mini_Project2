import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './Home'
import './App.css';
import Login from './pages/Login.jsx';
import Modifyprofile from './pages/Modifyprofile.jsx';
import Mypage from './pages/Mypage.jsx';
import Searchuser from './pages/Searchuser.jsx';
// import Board from './Board';
// import { Button } from './components/Button';
import '@toast-ui/editor/dist/toastui-editor.css';
import BoardList from './pages/BoardList.jsx';
import PostModify from './pages/PostModify.jsx';
import PostView from './pages/PostView.jsx';
import PostWrite from './pages/PostWrite.jsx';
import Chart from './pages/Chart';
import Calendar from './pages/calendar';


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
      {/* <Calendar />
            <Chart /> */}
      <Routes>
        <Route path='/' element={<Home />} /> {/*메인 페이지*/}
        <Route path='/Login' element={<Login />} /> {/*로그인 페이지*/}
        <Route path='/Searchuser' element={<Searchuser />} /> {/* 아이디/비번찾기페이지 */}
        <Route path='/Mypage' element={<Mypage />} /> {/* 마이페이지 */}
        <Route path='/Mypage/Modifyprofile' element={<Modifyprofile />} /> {/* 회원정보수정페이지 */}
        <Route path='/boardlist' element={<BoardList />} /> {/* 게시판페이지 */}
        <Route path="/postWrite" element={<PostWrite /> } />
        <Route path="/postView" element={<PostView /> } />
        <Route path="/postModify" element={<PostModify /> } />
        <Route path="/postView" element={<PostView /> } />
      </Routes>
        
    </>
  );
}
export default App;