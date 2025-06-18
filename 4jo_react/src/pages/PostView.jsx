import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const dummyPosts = [
    { _id: "1", title: "React 게시판 만들기", content: "내용입니다.", author: "관리자", date: "2025-06-18", views: 10 },
    { _id: "2", title: "첫 글입니다", content: "이건 첫 글이에요.", author: "홍길동", date: "2025-06-17", views: 5 },
];

const PostView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("no");

    const [post, setPost] = useState(null);

    useEffect(() => {
        // 임시 더미데이터에서 가져오기 (나중엔 axios.get)
        const found = dummyPosts.find((p) => p._id === postId);
        setPost(found);
    }, [postId]);

    const handleDelete = () => {
        // 나중에 axios.delete 요청
        alert("삭제되었습니다.");
        navigate("/");
    };

    const handleEdit = () => {
        // 글 수정 페이지로 이동 (이 예시에서는 PostWrite 재활용 가능)
        navigate(`/postWrite?no=${postId}`);
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
                        <td>{post.views}</td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td style={{ height: "200px" }}>{post.content}</td>
                    </tr>
                </tbody>
            </table>

            <div style={{ marginTop: "20px", textAlign: "right" }}>
                <button onClick={handleEdit}>수정</button>{" "}
                <button onClick={handleDelete}>삭제</button>{" "}
                <button onClick={() => navigate("/")}>목록</button>
            </div>
        </div>
    );
};

export default PostView;
