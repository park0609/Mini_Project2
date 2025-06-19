import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const UpdateWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("no");

    useEffect(() => {
        if (postId) {
            axios.get(`http://localhost:8090/posts/${postId}`)
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

    const ModifySubmit = (e) => {
        e.preventDefault();

        const newPost = {
            id: postId, // 수정 시 id 꼭 포함!
            title,
            content,
            author,
            date: new Date().toISOString().split('T')[0],
            views: 0,
        };

        if (postId) {
            // 수정
            axios.put(`http://localhost:8090/posts/${postId}`, newPost)
                .then(() => {
                    alert("글이 수정되었습니다.");
                    navigate(`/postView?no=${postId}`);
                })
                .catch(err => {
                    console.error("수정 실패", err);
                });
        }
        // } else {
        //     // 등록
        //     axios.post("http://localhost:8090/posts", newPost)
        //         .then(() => {
        //             alert("글이 등록되었습니다.");
        //             navigate("/");
        //         })
        //         .catch(err => {
        //             console.error("등록 실패", err);
        //         });
        // }
    };

    return (
        <div style={{ width: "80%", margin: "0 auto", marginTop: "40px" }}>
            <h2> 게시판 수정</h2>
            <form onSubmit={ModifySubmit}>
                <div style={{ margin: "10px 0" }}>
                    <label>제목: </label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div style={{ margin: "10px 0" }}>
                    <label>내용: </label><br />
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" cols="80" required />
                </div>
                <div style={{ margin: "10px 0" }}>
                    <label>작성자: </label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
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

export default UpdateWrite;
