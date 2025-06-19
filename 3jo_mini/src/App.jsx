import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef, useEffect } from 'react';

// 페이지 컴포넌트 import
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import BoardList from './pages/BoardList';
import PostWrite from './pages/PostWrite';
import PostView from './pages/PostView';
import PostModify from './pages/PostModify';

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
    <Router>
      <div ref={navRef}>
        <Navbar />
      </div>
      <div style={{ paddingTop: "80px" }}>{/* ← 네비 높이만큼 밀어줌 */}
        <Routes>
          {/* 글 목록 */}
          <Route path="/" element={<BoardList />} />

          {/* 글 작성 */}
          <Route path="/postWrite" element={<PostWrite />} />

          {/* 글 상세보기 */}
          <Route path="/postView" element={<PostView />} />

          <Route path="/postModify" element={<PostModify />} />
          <Route path="/InfoBoard" element={<InfoBoard />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
