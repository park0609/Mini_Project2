import { useEffect, useState } from 'react';
import axios from 'axios';

function Viewtop() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/board/top-viewer')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('조회수 Top 5 가져오기 실패:', error);
                console.error('에러 응답:', error.response);  // 서버 응답
                console.error('에러 요청:', error.request);  // 요청 정보
                console.error('에러 메세지:', error.message); // 메세지

            });
    }, []);

    return (
        <>
            <h1>조회수 Top 5</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title} (조회수: {post.viewer})
                    </li>
                ))}
            </ul>
        </>
    );
}

export default Viewtop;