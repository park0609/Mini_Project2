import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();
    const location = useLocation();


    // 글 수정 여부 확인용
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("no");

    useEffect(() => {
        if (postId) {
            axios.get(`/posts/${postId}`)
                .then(res => {
                    const data = res.data;
                    setTitle(data.title);
                    setContent(data.content);
                    setAuthor(data.author);
                })
                .catch(err => {
                    console.error("글 불러오기 실패", err);
                });
        }
    }, [postId]);

    // 글 등록 & 수정
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            title,
            content,
            author,
            date: new Date().toISOString().split('T')[0], // 날짜 형식: YYYY-MM-DD
            views: 0,
        };


        if (postId) {
            // 수정 요청
            axios.put(`/posts/${postId}`, newPost)
                .then(() => {
                    alert("글이 수정되었습니다.");
                    navigate(`/postView?no=${postId}`);
                })
                .catch(err => {
                    console.error("수정 실패", err);
                });
        } else {
            // 새 글 등록 요청 구현 예정
            alert("글이 등록되었습니다.");
            navigate("/");
        };

        console.log("작성된 글:", newPost);

        // 나중에 axios.post로 백엔드에 보낼 예정
        // axios.post("http://localhost:8080/posts", newPost)

        navigate("/"); // 글 작성 후 목록으로 이동
    };


    const handleCommit = () => {
        axios.post("http://localhost:8090/commit", {
            title: title,
            content: content,
        })
        /*  return console.log(title) */

    }
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
                <button type="submit" onClick={handleCommit()}>등록</button>

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
