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
                                <td >
                                    <Link to={`/postview?no=${post.id}`} style={{ textDecoration: "none" }}>{post.title}</Link>
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
