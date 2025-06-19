import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';

// 컴포넌트 import
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import BoardList from './pages/BoardList';
import PostWrite from './pages/PostWrite';
import PostView from './pages/PostView';
import InfoBoard from './pages/InfoBoard';
import PostModify from './pages/PostModify'

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
          <Route path="/" element={<BoardList />} />
          <Route path="/postWrite" element={<PostWrite />} />
          <Route path="/postView" element={<PostView />} />
          <Route path="/postModify" element={<PostModify />} />
          <Route path="/InfoBoard" element={<InfoBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;



