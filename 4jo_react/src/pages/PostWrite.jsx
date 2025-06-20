import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Editor } from '@toast-ui/react-editor';
//const LazyEditor = React.lazy(() => import('@toast-ui/react-editor'));
//import { Editor } from '@toast-ui/react-editor';
//import React from 'react';
import { useRef } from 'react';
import axios from 'axios';

const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const editorRef = useRef();


    // 글 수정 여부 확인용
    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("no");

    useEffect(() => {
        if (postId) {
            axios.get(`/posts/${postId}`)
                .then(res => {
                    const data = res.data;
                    setTitle(data.title);
                    setContent(data.content);
                    setAuthor(data.author);
                })
                .catch(err => {
                    console.error("글 불러오기 실패", err);
                });
        }
    }, [postId]);

    // 글 등록 
    const handleSubmit = (e) => {
        e.preventDefault();
        // const content = editorRef.current.getInstance().getHTML(); //toast ui 쓰기 위해 등록 버튼 클릭시 내용 가져오기
        const content = editorRef.current.getInstance().getMarkdown(); //toast ui 쓰기 위해 등록 버튼 클릭시 내용 가져오기

        const newPost = {
            title,
            content,
            author,
            date: new Date().toISOString().split('T')[0], // 날짜 형식: YYYY-MM-DD
            views: 0,
        };

        // console.log("작성된 글:", newPost);
        // // 예시 목적 navigate만 있음
        // navigate("/");



        axios.post("http://localhost:8090/posts/commit", newPost)
            .then(() => {
                alert("글이 등록되었습니다!");
                navigate("/");
            })
            .catch(err => {
                console.error("등록 실패", err);
            });
    };

    return (
        <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", marginTop: "200px" }}>
            <form onSubmit={handleSubmit}>

                {/* 제목 */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "66px", fontWeight: "bold", textAlign: "right", paddingRight: "10px" }}>
                        제목
                    </label>
                    <input
                        type="text"
                        placeholder="제목을 입력해 주세요."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={{
                            flex: 1,
                            height: "40px",
                            fontSize: "16px",
                            padding: "6px 10px",
                            boxSizing: "border-box"
                        }}
                    />
                </div>

                {/* 작성자 */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                    <label style={{ width: "66px", fontWeight: "bold", textAlign: "right", paddingRight: "10px" }}>
                        작성자
                    </label>
                    <input
                        type="text"
                        placeholder="작성자 이름"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        style={{
                            flex: 1,
                            height: "40px",
                            fontSize: "16px",
                            padding: "6px 10px",
                            boxSizing: "border-box"
                        }}
                    />
                </div>

                {/* 내용 */}
                <div style={{
                    display: "flex",
                    alignItems: "flex-start",
                    marginBottom: "20px"
                }}>
                    <label style={{
                        width: "80px",
                        fontWeight: "bold",
                        textAlign: "right",
                        paddingRight: "10px",
                        marginTop: "8px"
                    }}>
                        내용
                    </label>
                    <div style={{ flex: 1 }}>
                        <Editor

                            initialEditType="wysiwyg"
                            initialValue={content}
                            ref={editorRef}
                            previewStyle="vertical"
                            height="400px"
                            useCommandShortcut={true}
                        />
                    </div>
                </div>

                {/* 버튼 */}
                <div style={{ textAlign: "center" }}>
                    <button type="submit" style={{ marginRight: "10px" }}>등록</button>
                    <Link to="/">
                        <button type="button">목록</button>
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default PostWrite;
