import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Viewer } from '@toast-ui/react-editor';
import axios from 'axios';
import './PostView.css';

export default function PostView() {
    const location = useLocation();
    const navigate = useNavigate();

    const [postId, setPostId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [recommentingTo, setRecommentingTo] = useState(null);
    const [recommentContent, setRecommentContent] = useState('');
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);

    // 쿼리 파라미터 변화 감지 및 데이터 로드
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const id = params.get('no');
        if (!id) {
            navigate('/boardlist');
            return;
        }
        if (id !== postId) {
            setPostId(id);

            // 1) 유저 정보
            axios.get('/search-cookie', { withCredentials: true })
                .then(res => setUserInfo(res.data))

            // 2) 게시글
            axios.get(`/posts/${id}`)
                .then(res => setPost(res.data))
                .catch(err => console.error('게시글 불러오기 실패', err));

            // 3) 댓글
            axios.get(`/posts/${id}/comments`)
                .then(res => setComments(res.data))
                .catch(err => console.error('댓글 가져오기 실패', err));

            // 4) 좋아요 수
            axios.get(`/like/count/${id}`)
                .then(res => setLikeCount(res.data))
                .catch(err => console.error('좋아요 값 가져오기 실패', err));

            // 5) 좋아요 상태
            if (userInfo?.userid) {
                axios.get(`/like/status/${id}`, {
                    params: { userId: userInfo.userid }, withCredentials: true
                })
                    .then(res => setLiked(res.data))
                    .catch(err => console.error('좋아요 상태 가져오기 실패', err));
            }

            // 6) 조회수 증가
            const viewedKey = `viewed_${id}`;
            const viewedData = JSON.parse(localStorage.getItem(viewedKey));
            const now = Date.now();

            // 30초 내 조회수 증가 생략
            if (!viewedData || now - viewedData.time > 30000) {
                axios.put(`/posts/${id}/view`)
                    .then(() => {
                        localStorage.setItem(viewedKey, JSON.stringify({ time: now }));
                        console.log("조회수 증가 완료");
                    })
                    .catch(err => {
                        console.error("게시글 조회 중 오류", err);
                    });
            }
            cleanUpOldViewedPosts();
        }
    }, [location.search, postId, navigate, userInfo]);

    const toKST = isoString => {
        if (!isoString) return '';
        // Date.parse(isoString) 로 UTC 기준 timestamp(ms) 얻고, +9h
        const ts = Date.parse(isoString) + 9 * 60 * 60 * 1000;
        return new Date(ts).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const cleanUpOldViewedPosts = () => {
        const now = Date.now();
        const cleanuptime = 30 * 1000;

        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("viewed_")) {
                try {
                    const value = JSON.parse(localStorage.getItem(key));
                    if (value?.time && now - value.time > cleanuptime) {
                        localStorage.removeItem(key);
                        console.log(`'${key}'삭제됨 `);
                    }
                } catch (err) {
                    console.warn(`'${key}' 삭제 중 오류`, err);
                    localStorage.removeItem(key);
                }
            }
        });
    };

    const handleAddComment = () => {
        if (!newComment.trim()) return alert('댓글을 입력하세요');
        axios.post(
            `/posts/${postId}/comments`,
            { content: newComment, author: userInfo.username, authorId: userInfo.userid },
            { withCredentials: true }
        )
            .then(res => {
                setComments(prev => [...prev, res.data]);
                setNewComment('');
            })
            .catch(() => alert('댓글 작성 실패'));
    };

    const handleAddRecomment = parentId => {
        if (!recommentContent.trim()) return alert('답글을 입력하세요');
        axios.post(
            `/posts/${postId}/comments/${parentId}/recomments`,
            { content: recommentContent, author: userInfo.username, authorId: userInfo.userid },
            { withCredentials: true }
        )
            .then(res => {
                setComments(prev =>
                    prev.map(c =>
                        c.id === parentId
                            ? { ...c, recomments: [...(c.recomments || []), res.data] }
                            : c
                    )
                );
                setRecommentingTo(null);
                setRecommentContent('');
            })
            .catch(() => alert('답글 작성 실패'));
    };

    const handleDeleteComment = commentId => {
        axios.delete(`/posts/${postId}/comments/${commentId}`, { withCredentials: true })
            .then(() => setComments(prev => prev.filter(c => c.id !== commentId)))
            .catch(() => alert('댓글 삭제 실패'));
    };

    // const handleDeleteRecomment = (parentId, reId) => {
    //     axios.delete(
    //         `/posts/${postId}/comments/${parentId}/recomments/${reId}`,
    //         { withCredentials: true }
    //     )
    //         .then(() =>
    //             setComments(prev =>
    //                 prev.map(c =>
    //                     c.id === parentId
    //                         ? { ...c, recomments: (c.recomments || []).filter(r => r.id !== reId) }
    //                         : c
    //                 )
    //             )
    //         )
    //         .catch(() => alert('답글 삭제 실패'));
    // };

    const handleDeleteRecomment = (recommentId) => {
        axios.delete(`/posts/${postId}/recomments/${recommentId}`)
            .then(() => {
                setComments(prev => prev.map(c => ({
                    ...c,
                    recomments: c.recomments ? c.recomments.filter(r => r.id !== recommentId) : []
                })));
                alert("답글 삭제 완료");
            })
            .catch(() => alert("답글 삭제 실패"));
    };

    const handleLike = () => {
        axios.post(
            `/like/${postId}`,
            null,
            { params: { userId: userInfo.userid }, withCredentials: true }
        )
            .then(() => {
                setLiked(prev => !prev);
                setLikeCount(prev => prev + (liked ? -1 : 1));
            })
            .catch(err => console.error('좋아요 실패', err));
    };

    const handleDeletePost = async () => {
        try {
            await axios.delete(`/posts/${postId}`, { withCredentials: true });
            alert('게시글이 삭제되었습니다.');
            navigate('/boardlist');
        } catch {
            alert('게시글 삭제 실패');
        }
    };

    const handleEditPost = () => {
        navigate(`/postModify?no=${postId}`);
    };

    if (!post) return <div>❗게시글을 찾을 수 없습니다.</div>;

    // 댓글+답글 총 개수
    const totalComments = comments.reduce((sum, c) => sum + 1 + (c.recomments?.length || 0), 0);

    return (
        <div className="post-view-container">
            <h2 className="post-header">📄 게시글 상세보기</h2>
            {/* <table className="post-table" border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>
                            {post.title}
                            {totalComments > 0 && <span className="comment-count">[{totalComments}]</span>}
                        </td>
                    </tr>
                    <tr><th>작성자</th><td>{post.author}</td></tr>
                    <tr><th>등록일</th><td>{post.date}</td></tr>
                    <tr><th>조회수</th><td>{post.viewCount}</td></tr>
                    <tr><th>좋아요</th><td>{likeCount}</td></tr>
                    <tr>
                        <th>내용</th>
                        <td style={{ height: '200px' }}>
                            <Viewer initialValue={post.content} sanitize={false} />
                        </td>
                    </tr>
                </tbody>
            </table> */}
            <div className="post-detail-container">
                <div className="post-header">
                    <h1 className="post-title">
                        {post.title}
                        {totalComments > 0 && <span className="comment-count">[{totalComments}]</span>}
                    </h1>
                    <div className="post-meta">
                        <span className="author">{post.author}</span>
                        <span className="date">{toKST(post.date)}</span>
                        <span className="views">조회 {post.viewCount}</span>
                        <span className="likes">좋아요 {likeCount}</span>
                    </div>
                </div>
                <div className="post-content">
                    <Viewer initialValue={post.content} sanitize={false} />
                </div>
            </div>

            <div className="post-buttons">
                <button onClick={handleLike}>
                    {liked ? '🤍 좋아요 취소' : '❤️ 좋아요'} {likeCount}
                </button>
                {userInfo?.userid === post.userid && (
                    <>
                        <button onClick={handleEditPost}>수정</button>
                        <button onClick={handleDeletePost}>삭제</button>
                    </>
                )}
                <button onClick={() => navigate('/boardlist')}>목록</button>
            </div>

            <div className="comment-section">
                <h3>💬 댓글 ({totalComments})</h3>
                {userInfo?.userid ?
                    <div className="comment-input">
                        <input
                            type="text"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="댓글을 입력하세요"
                            style={{ width: "80%", padding: "5px" }}
                        />
                        <button onClick={handleAddComment} className='post-button'>작성</button>
                    </div>
                    : ""}
            </div>

            {!comments.length ? (
                <p>댓글이 없습니다.</p>
            ) : (
                <ul className="comment-list">
                    {comments.map(cmt => (
                        <li key={cmt.id} className="comment-item">
                            <strong>{cmt.author}</strong>: {cmt.content}
                            {userInfo?.userid === cmt.authorId && (
                                <button onClick={() => handleDeleteComment(cmt.id)} className="post-button">
                                    댓글삭제
                                </button>
                            )}

                            {userInfo?.userid ?
                                <>
                                    <button onClick={() => setRecommentingTo(cmt.id)} className="post-button">답글쓰기</button>
                                    {cmt.recomments && cmt.recomments.map(re => (
                                        <div key={re.id} style={{ marginLeft: "20px", paddingTop: "2px" }}>
                                            <strong>{re.author}</strong>: {re.content}
                                            {userInfo?.userid === re.authorId && (
                                                <button onClick={() => handleDeleteRecomment(re.id)} className="post-button">답글삭제</button>
                                            )}
                                        </div>
                                    ))}
                                </>
                                :
                                <>
                                    {cmt.recomments && cmt.recomments.map(re => (
                                        <div key={re.id} style={{ marginLeft: "20px", paddingTop: "2px" }}>
                                            <strong>{re.author}</strong>: {re.content}
                                            {userInfo?.userid === re.authorId && (
                                                <button onClick={() => handleDeleteRecomment(re.id)} className="post-button">답글삭제</button>
                                            )}
                                        </div>
                                    ))}
                                </>
                            }
                            {recommentingTo === cmt.id && (
                                <div className="comment-input">
                                    <input
                                        type="text"
                                        value={recommentContent}
                                        onChange={e => setRecommentContent(e.target.value)}
                                        placeholder="답글을 입력하세요"
                                    />
                                    <button onClick={() => handleAddRecomment(cmt.id)} className="post-button">
                                        작성
                                    </button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}


        </div>
    );
}
