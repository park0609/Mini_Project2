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
