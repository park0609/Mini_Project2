import axios from 'axios';
import { useEffect, useState } from 'react';
import '../Home.css';
import './ViewLikeTop.css';
import { Link } from 'react-router-dom'


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
            <div className='like-top'>
                <div className='top-name'>
                    <div className='top-title'>좋아요 Top 5</div>
                    <Link to='/boardlist'><span className='board-move'>+</span></Link>
                </div>
                <ul className='top-content'>
                    {posts.map(post => (
                        <li key={post.id} >
                            {post.title} (작성자: {post.author}, 조회수: {post.viewer}, 좋아요: {post.likeCount})
                        </li>
                    ))}
                </ul>
            </div >
        </>
    );
}

export default TopLike;