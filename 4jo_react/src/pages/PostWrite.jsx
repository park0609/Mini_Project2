import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Editor } from '@toast-ui/react-editor';
import { useRef } from 'react';


const PostWrite = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const navigate = useNavigate();
    const editorRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const content = editorRef.current.getInstance().getHTML(); //toast ui 쓰기 위해 등록 버튼 클릭시 내용 가져오기
        const newPost = {
            title,
            content,
            author,
            date: new Date().toISOString().split('T')[0], // 날짜 형식: YYYY-MM-DD
            views: 0,
        };

        console.log("작성된 글:", newPost);

        // 나중에 axios.post로 백엔드에 보낼 예정
        // axios.post("http://localhost:8080/posts", newPost)

        navigate("/"); // 글 작성 후 목록으로 이동
    };

    return (
        <div style={{ width: "100%", maxWidth: "900px", margin: "0 auto", marginTop: "200px" }}>

            {/* 제목 줄 */}
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

            {/* 내용 줄 */}
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
                        ref={editorRef}
                        previewStyle="vertical"
                        height="400px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                    />
                </div>
            </div>

            {/* 버튼 */}
            <div style={{ textAlign: "center" }}>
                <button style={{ marginRight: "10px" }}>등록</button>
                <button>목록</button>
            </div>

        </div>

    );
};

export default PostWrite;
