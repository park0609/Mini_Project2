import { useEffect, useState } from 'react';
import axios from 'axios';

function TopLike() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('/api/board/top-like')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.error('좋아요 Top 5 가져오기 실패:', error.response || error);
            });
    }, []);

    return (
        <>
            <h1>좋아요 Top 5</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        {post.title} (작성자: {post.author}, 조회수: {post.viewer}, 좋아요: {post.likeCount})
                    </li>
                ))}
            </ul>
        </>
    );
}

export default TopLike;