import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Board.css';

const BoardList = ({ posts }) => {
    return (
        <div>
            <h2>📋 게시글 목록</h2>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/write">글쓰기</Link>
        </div>
    );
};

export default BoardList;

