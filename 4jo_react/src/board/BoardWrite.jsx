import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Board.css';

const BoardWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:8080/posts', { title, content })
            .then(() => navigate('/'))
            .catch(err => console.error(err));
    };

    return (

        <form onSubmit={handleSubmit}>
            <h2>글쓰기</h2>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" required />
            <br />
            <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" required />
            <br />
            <button type="submit">등록</button>
        </form>

    );
};

export default BoardWrite;