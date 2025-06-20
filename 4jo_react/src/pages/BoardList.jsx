import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

//db 연결시삭제
// const dummyPosts = [
//     { _id: "1", title: "React 게시판 만들기", author: "관리자", date: "2025-06-18", views: 10 },
//     { _id: "2", title: "첫 글입니다", author: "홍길동", date: "2025-06-17", views: 5 },
// ];


const BoardList = () => {

    const [post, setPost] = useState([]);


    useEffect(() => {
        axios.get("/posts/board_list")
            .then(respose => {
                setPost(respose.data)
            })
    }, [])

    return (
        <div style={{ width: "80%", margin: "0 auto", marginTop: "40px" }}>
            <h2>게시판</h2>

            <div style={{ marginBottom: "10px", textAlign: "left" }}>
                <Link to="/postWrite">
                    <button>글쓰기</button>
                </Link>
            </div>

            <table width="100%" border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>등록일</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {dummyPosts.map((post, index) => ( */}
                    {post.map((post, index) => (
                        <tr key={index}>
                            <td>{post.id}</td>
                            <td>
                                <Link to={`/postView?no=${post.id}`}>{post.title}</Link>
                            </td>
                            <td>{post.author}</td>
                            <td>{new Date(post.date).toLocaleDateString('ko-KR')}</td>
                            <td>123</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardList;
