import { useEffect, useState } from 'react';
import axios from 'axios';
import '../Home.css'
import { Link } from 'react-router-dom'

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
            <div className='view-top'>
                <div className='top-name'>
                    <div className='top-title'>조회수 Top 5</div>
                    <Link to='/boardlist'><span className='board-move'>+</span></Link>
                </div>
                <ul className='top-content'>
                    {posts.map(post => (
                        <li key={post.id} >
                            {post.title} (조회수: {post.viewer})
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default Viewtop;