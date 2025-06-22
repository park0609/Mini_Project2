import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import axios from 'axios';
//const LazyEditor = React.lazy(() => import('@toast-ui/react-editor'));
//import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';


const UpdateWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const editorRef = useRef();


    const searchParams = new URLSearchParams(location.search);
    const postId = searchParams.get("no");

    useEffect(() => {
        if (postId) {
            axios.get(`http://localhost:8090/posts/${postId}`)
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

    const ModifySubmit = (e) => {
        e.preventDefault();
        const content = editorRef.current.getInstance().getMarkdown();
        const newPost = {
            id: postId, // 수정 시 id 꼭 포함!
            title,
            content,
            author,
            date: new Date().toISOString().split('T')[0],
            views: 0,
        };

        if (postId) {
            // 수정
            axios.put(`http://localhost:8090/posts/${postId}`, newPost)
                .then(() => {
                    alert("글이 수정되었습니다.");
                    navigate(`/postView?no=${postId}`);
                })
                .catch(err => {
                    console.error("수정 실패", err);
                });
        }
        // } else {
        //     // 등록
        //     axios.post("http://localhost:8090/posts", newPost)
        //         .then(() => {
        //             alert("글이 등록되었습니다.");
        //             navigate("/");
        //         })
        //         .catch(err => {
        //             console.error("등록 실패", err);
        //         });
        // }
    };

    return (
        <div style={{ width: "80%", margin: "0 auto", marginTop: "40px" }}>
            <h2> 게시판 수정</h2>
            <form onSubmit={ModifySubmit}>
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
                            previewStyle="tab"
                            height="400px"
                            useCommandShortcut={true}
                            hooks={{
                                addImageBlobHook: async (blob, callback) => {
                                    const formData = new FormData();
                                    formData.append('image', blob);

                                    try {
                                        const res = await axios.post("http://localhost:8090/api/upload-image", formData, {
                                            headers: { 'Content-Type': 'multipart/form-data' }
                                        });
                                        callback(res.data, 'image');
                                    } catch (err) {
                                        console.error("이미지 업로드 실패", err);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>


                {/* 버튼 */}
                <div style={{ textAlign: "center" }}>
                    <button type="submit" style={{ marginRight: "10px" }}>등록</button>
                    <Link to="/boardlist">
                        <button type="button">목록</button>
                    </Link>
                </div>
            </form >
        </div >
    );
};

export default UpdateWrite;
