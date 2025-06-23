import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import axios from 'axios';



const PostView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("no");
    const [userinfo, setUserinfo] = useState('');
    const [post, setPost] = useState(null);
    // 댓글 상태 추가
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    // 답글 추가
    const [recommentingTo, setRecommentingTo] = useState(null);  // 답글 입력창 열릴 댓글 ID
    const [recommentContent, setRecommentContent] = useState("");  // 답글 입력값


    useEffect(() => {

        console.log("useEffect 실행됨")
        axios.get(`/posts/${postId}`)
            .then((res) => {
                console.log("데이터 받음: ", res.data)
                setPost(res.data); // 실제 글 목록으로 상태 설정
            })
            .catch((err) => console.error("에러: ", err));

        // 회원정보 가져오기
        axios.get('/search-cookie', { withCredentials: true })
            .then(res => {
                setUserinfo(res.data)
                console.log("사용자 정보:", res.data);
            })
            .catch(err => {
                console.error(err);
                alert("인증 실패 또는 서버 오류");
            });

        // 초기 댓글 가져오기
        axios.get(`/posts/${postId}/comments`)
            .then(res => {
                setComments(res.data);
            })
            .catch(err => {
                console.error("댓글 가져오기 실패", err);
            });
    }, [postId]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/posts/${postId}`);
            alert("삭제되었습니다.");
            navigate("/boardlist");
        } catch (error) {
            console.error("삭제 중 오류 발생", error);
            alert("삭제에 실패했습니다.");
        }
    };

    const handleEdit = () => {
        // 글 수정 페이지로 이동 (이 예시에서는 PostWrite 재활용 가능)
        navigate(`/postModify?no=${postId}`);
    };

    const handleAddComment = () => {
        if (!newComment.trim()) {
            alert("댓글을 입력하세요");
            return;
        }
        axios.post(`/posts/${postId}/comments`, {
            content: newComment,
            author: userinfo.username
        })
            .then(res => {
                // 새 댓글을 배열 맨 뒤에 추가
                setComments(prev => [...prev, res.data]);
                setNewComment("");  // 입력창 비우기
            })
            .catch(err => {
                console.error("댓글 작성 실패", err);
                alert("댓글 작성에 실패했습니다.");
            });
    };


    // 답글
    const handleAddRecomment = (parentComment) => {
        if (!recommentContent.trim()) {
            alert("답글을 입력하세요");
            return;
        }
        axios.post(`/posts/${postId}/comments/${parentComment.id}/recomments`, {
            content: recommentContent,
            author: userinfo.username
        })
            .then(res => {
                // 답글을 해당 댓글에 추가
                setComments(prev => prev.map(c => {
                    if (c.id === parentComment.id) {
                        return {
                            ...c,
                            recomments: [...(c.recomments || []), res.data]
                        }
                    }
                    return c;
                }));
                setRecommentingTo(null);
                setRecommentContent("");
            })
            .catch(err => {
                console.error("답글 작성 실패", err);
                alert("답글 작성에 실패했습니다.");
            });
    };






    if (!post) return <div>❗게시글을 찾을 수 없습니다.</div>;
    return (
        <div style={{ width: "80%", margin: "0 auto", marginTop: "40px" }}>
            <h2>📄 게시글 상세보기</h2>
            <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td>{post.title}</td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td>{post.author}</td>
                    </tr>
                    <tr>
                        <th>등록일</th>
                        <td>{post.date}</td>
                    </tr>
                    <tr>
                        <th>조회수</th>
                        {/* <td>{post.views}</td> */}
                        <td>123</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td colSpan="3">
                            <Viewer initialValue={post.content} sanitize={false} />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
                {userinfo && userinfo.userid === post.userid && (
                    <>
                        <button onClick={handleEdit}>수정</button>{" "}
                        <button onClick={handleDelete}>삭제</button>{" "}
                    </>
                )}
                <button onClick={() => navigate("/boardlist")}>목록</button>
            </div>
            {/* 댓글 출력 */}
            <div style={{ marginTop: "30px" }}>
                <h3>💬 댓글</h3>
                {comments.length === 0 && <p>댓글이 없습니다.</p>}
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {comments.map((cmt, index) => (
                        <li key={index} style={{ padding: "5px 0", borderBottom: "1px solid #ccc" }}>
                            <strong>{cmt.author}</strong>: {cmt.content}
                            <button onClick={() => setRecommentingTo(cmt.id)}>답글쓰기</button>

                            {/* 답글 입력창 표시 */}
                            {recommentingTo === cmt.id && (
                                <div style={{ marginTop: "5px", marginLeft: "20px" }}>
                                    <input
                                        type="text"
                                        value={recommentContent}
                                        onChange={(e) => setRecommentContent(e.target.value)}
                                        placeholder="답글을 입력하세요"
                                        style={{ width: "70%", padding: "3px" }}
                                    />
                                    <button onClick={() => handleAddRecomment(cmt)}>작성</button>
                                </div>
                            )}

                            {/* 답글 목록 표시 */}
                            {cmt.recomments && cmt.recomments.map((re, idx) => (
                                <div key={idx} style={{ marginLeft: "20px", paddingTop: "2px" }}>
                                    <strong>{re.author}</strong>: {re.content}
                                </div>
                            ))}
                        </li>
                    ))}
                </ul>

                {/* 댓글 입력 */}
                <div style={{ marginTop: "10px" }}>
                    <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="댓글을 입력하세요"
                        style={{ width: "80%", padding: "5px" }}
                    />
                    <button onClick={handleAddComment} style={{ padding: "5px 10px", marginLeft: "5px" }}>
                        작성
                    </button>
                </div>
            </div>
        </div>

    );
};

export default PostView;