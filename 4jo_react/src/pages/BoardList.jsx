<<<<<<< Updated upstream
import { Link } from 'react-router-dom';

//db 연결시삭제
const dummyPosts = [
    { _id: "1", title: "React 게시판 만들기", author: "관리자", date: "2025-06-18", views: 10 },
    { _id: "2", title: "첫 글입니다", author: "홍길동", date: "2025-06-17", views: 5 },
    { _id: "3", title: "두 번째 글이에요", author: "이순신", date: "2025-06-16", views: 7 },
    { _id: "4", title: "질문있습니다", author: "김유신", date: "2025-06-15", views: 3 },
    { _id: "5", title: "오늘 날씨 좋네요", author: "강감찬", date: "2025-06-14", views: 8 },
    { _id: "6", title: "공부는 어떻게 하세요?", author: "세종대왕", date: "2025-06-13", views: 2 },
    { _id: "7", title: "React vs Vue", author: "유관순", date: "2025-06-12", views: 12 },
    { _id: "8", title: "Spring Boot 연동하기", author: "장보고", date: "2025-06-11", views: 9 },
    { _id: "9", title: "JavaScript 팁 공유", author: "안중근", date: "2025-06-10", views: 6 },
    { _id: "10", title: "게시판 테스트", author: "강호동", date: "2025-06-09", views: 1 },
];


const BoardList = () => {
    return (

        <div style={{ width: "80%", margin: "0 auto", marginTop: "40px" }}>
            <h2>자유 게시판</h2>
            <hr style={{ border: "1px solid #ddd", margin: "30px 0" }} />
            {/*  <div style={{ height: "1500px", backgroundColor: "#eee" }}>
                스크롤 테스트
            </div> */}

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
                    {dummyPosts.map((post, index) => (
                        <tr key={post._id}>
                            <td>{index + 1}</td>
                            <td>
                                <Link to={`/postView?no=${post._id}`}>{post.title}</Link>
                            </td>
                            <td>{post.author}</td>
                            <td>{post.date}</td>
                            <td>{post.views}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BoardList;
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LikeCount from './LikeCount';
import './BoardList.css';

export default function BoardList() {
    const [posts, setPosts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const size = 10;
    const navigate = useNavigate();

    // 페이지별 게시글 로딩 및 댓글 수 추가
    const fetchPage = async (page) => {
        try {
            const { data } = await axios.get('/api/board', { params: { page, size } });
            const list = data.posts || data;
            // 댓글+답글 수 계산
            const withComments = await Promise.all(
                list.map(async (post) => {
                    const { data: cmts } = await axios.get(`/posts/${post.id}/comments`);
                    const totalComments = cmts.reduce(
                        (sum, c) => sum + 1 + (c.recomments ? c.recomments.length : 0),
                        0
                    );
                    return { ...post, commentCount: totalComments };
                })
            );
            setPosts(withComments);
            const count = data.totalCount ?? list.length;
            setTotalCount(count);
            setTotalPages(data.totalPages ?? Math.ceil(count / size));
            setCurrentPage(page);
        } catch (err) {
            console.error('페이지 조회 실패:', err);
        }
    };

    useEffect(() => {
        fetchPage(1);
    }, []);

    return (
        <div className="board-container">
            <div className="board-header">
                <button className="write-button" onClick={() => navigate('/postwrite')}>글쓰기</button>
            </div>
            <table className="board-table" width="100%" border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
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
                    {posts.map((post, idx) => {
                        const number = totalCount - ((currentPage - 1) * size + idx);
                        const dateText = post.date ? new Date(post.date).toLocaleDateString('ko-KR') : '';
                        const commentTotal = post.commentCount || 0;
                        return (
                            <tr key={post.id} className={idx % 2 === 0 ? 'even' : 'odd'}>
                                <td>{number}</td>
                                <td>
                                    <Link to={`/postview?no=${post.id}`}>{post.title}</Link>
                                    {commentTotal > 0 && <span className="comment-count">[{commentTotal}]</span>}
                                </td>
                                <td>{post.author}</td>
                                <td>{dateText}</td>
                                <td>{post.viewCount}</td>
                                <td><LikeCount postId={post.id} /></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                        key={pageNum}
                        onClick={() => fetchPage(pageNum)}
                        className={pageNum === currentPage ? 'active' : ''}
                    >
                        {pageNum}
                    </button>
                ))}
            </div>
        </div>
    );
}
>>>>>>> Stashed changes
