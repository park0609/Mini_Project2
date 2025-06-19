import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 페이지 컴포넌트 import
import BoardList from './pages/BoardList';
import PostWrite from './pages/PostWrite';
import PostView from './pages/PostView';
import PostModify from './pages/PostModify';

function App() {
  return (
    <Router>
      <Routes>
        {/* 글 목록 */}
        <Route path="/" element={<BoardList />} />

        {/* 글 작성 */}
        <Route path="/postWrite" element={<PostWrite />} />

        {/* 글 상세보기 */}
        <Route path="/postView" element={<PostView />} />

        <Route path="/postModify" element={<PostModify />} />
      </Routes>
    </Router>
  );
}

export default App;
