import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LikeCount from './LikeCount';

const BoardList = () => {
    const [post, setPost] = useState([])

    useEffect(() => {
        axios.get("/posts/board_list")
            .then(response => {
                setPost(response.data)
            })
    }, [])


    return (
        <>
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
                            <th>좋아요</th>
                        </tr>
                    </thead>
                    <tbody>
                        {post.map((post, index) => (
                            <tr key={index}>
                                <td>{post.id}</td>
                                <td>
                                    <Link to={`/postView?no=${post.id}`}>{post.title}</Link>
                                </td>
                                <td>{post.author}</td>
                                <td>{new Date(post.date).toLocaleDateString('ko-KR')}</td>
                                <td>{post.viewCount}</td>
                                <td><LikeCount postId={post.id} /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
};

export default BoardList;
