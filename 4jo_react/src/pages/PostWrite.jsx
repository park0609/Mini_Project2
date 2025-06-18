import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title,
            content,
            author,
            date: new Date().toISOString().split('T')[0], // 날짜 형식: YYYY-MM-DD
            views: 0,
        };

        console.log("작성된 글:", newPost);

        // 나중에 axios.post로 백엔드에 보낼 예정
        // axios.post("http://localhost:8080/posts", newPost)

        navigate("/"); // 글 작성 후 목록으로 이동
    };

    return (
        <div style={{ width: "80%", margin: "0 auto", marginTop: "40px" }}>
            <h2> 게시판 글쓰기</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ margin: "10px 0" }}>
                    <label>제목: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div style={{ margin: "10px 0" }}>
                    <label>내용: </label><br />
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" cols="80" required />
                </div>
                {/* <div style={{ margin: "10px 0" }}>
                    <label>작성자: </label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div> */}
                <button type="submit">등록</button>

                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <Link to="/">
                        <button type="button">목록</button>
                    </Link>

                </div>
            </form>
        </div>
    );
};

export default PostWrite;
