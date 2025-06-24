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
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [recommentingTo, setRecommentingTo] = useState(null);
    const [recommentContent, setRecommentContent] = useState("");
    const [userId, setUserId] = useState("")
    const [like, setLike] = useState(false)
    const [likeCount, setLikeCount] = useState()

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

    }, [postId]);

    const handleAddComment = () => {
        if (!newComment.trim()) return alert("댓글을 입력하세요");
        axios.post(`/posts/${postId}/comments`, {
            content: newComment,
            author: userinfo.username,
            authorId: userinfo.userid
        })
            .then(res => {
                setComments(prev => [...prev, res.data]);
                setNewComment("");
            })
            .catch(() => alert("댓글 작성 실패"));
    };

    const handleAddRecomment = (parentComment) => {
        if (!recommentContent.trim()) return alert("답글을 입력하세요");
        axios.post(`/posts/${postId}/comments/${parentComment.id}/recomments`, {
            content: recommentContent,
            author: userinfo.username,
            authorId: userinfo.userid
        })
            .then(res => {
                setComments(prev => prev.map(c => {
                    if (c.id === parentComment.id) {
                        return { ...c, recomments: [...(c.recomments || []), res.data] };
                    }
                    return c;
                }));
                setRecommentingTo(null);
                setRecommentContent("");
            })
            .catch(() => alert("답글 작성 실패"));
    };

    const handleDeleteComment = (commentId) => {
        axios.delete(`/posts/${postId}/comments/${commentId}`)
            .then(() => {
                setComments(prev => prev.filter(c => c.id !== commentId));
                alert("댓글 삭제 완료");
            })
            .catch(() => alert("댓글 삭제 실패"));
    };

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

    //좋아요 증가 로직
    useEffect(() => {
        axios.get("/search-cookie", { withCredentials: true })
            .then(res => {
                console.log("userInfo:", res.data);
                setUserinfo(res.data);

                const id = res.data.userid || res.data.id || res.data.username;
                if (!id) {
                    console.warn(" userId가 없음");
                    return;
                }
                setUserId(id);  // 반드시 있어야 서버 요청 가능
            })
            .catch(err => {
                console.log("유저 정보 요청 실패", err);
            });
    }, []);

    const handleLike = async () => {
        try {
            await axios.post(`/like/${postId}?userId=${userId}`);
            setLike(prev => !prev);
        } catch (err) {
            console.error("좋아요 실패", err);
        }
    };

    useEffect(() => {
        axios.get(`/like/count/${postId}`)
            .then(res => {
                setLikeCount(res.data)
            })
            .catch(err => {
                console.log("좋아요 값 가져오지 못함", err)
            })
    }, [postId])

    useEffect(() => {
        if (!userId || !postId) return;

        axios.get(`/like/status/${postId}?userId=${userId}`, { withCredentials: true })
            .then(res => {
                setLike(res.data);
            })
            .catch(err => {
                console.error("좋아요 상태 불러오기 실패", err);
            });
    }, [userId, postId]);

    // 조회수 증가 로직
    useEffect(() => {
        if (!postId) {
            console.warn("postId가 없음, 조회수 증가 생략");
            return;
        }

        const View = async () => {
            try {
                console.log("postId:", postId);
                await axios.put(`/posts/${postId}/view`);
            } catch (error) {
                console.error("게시글 조회 중 오류", error);
            }
        }

        View()
    }, [postId])

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


    if (!post) return <div>❗게시글을 찾을 수 없습니다.</div>;

    return (
        <div style={{ width: "80%", margin: "0 auto", marginTop: "40px" }}>
            <h2>📄 게시글 상세보기</h2>
            <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse" }}>
                <tbody>
                    <tr><th>제목</th><td>{post.title}</td></tr>
                    <tr><th>작성자</th><td>{post.author}</td></tr>
                    <tr><th>등록일</th><td>{post.date}</td></tr>
                    <tr><th>조회수</th><td>{post.viewCount}</td></tr>
                    <tr><th>좋아요</th><td>{likeCount}</td></tr>
                    <tr><th>내용</th><td style={{ height: "200px" }} colSpan="3" ><Viewer initialValue={post.content} sanitize={false} /></td></tr>
                </tbody>
            </table>
            {/* 
            <div style={{ marginTop: "20px", textAlign: "right" }}>
                {userinfo && userinfo.username === post.author && (
                    <>
                        <button onClick={handleEdit}>수정</button>{" "}
                        <button onClick={handleDelete}>삭제</button>{" "}
                    </>
                )}
                <button onClick={() => navigate("/boardlist")}>목록</button>
            </div>
        </div>
    );
};

export default PostView;