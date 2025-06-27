import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Editor } from '@toast-ui/react-editor'
import { useRef } from 'react'
import axios from 'axios'

const PostWrite = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [userid, setUserid] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const editorRef = useRef()
    const [userinfo, setUserinfo] = useState([])

    // 글 수정 여부 확인용
    const searchParams = new URLSearchParams(location.search)
    const postId = searchParams.get("no")

    useEffect(() => {
        // 회원정보 가져오기
        axios.get('/search-cookie', { withCredentials: true })
            .then(res => {
                setUserinfo(res.data)
                console.log("사용자 정보:", res.data)
            })
            .catch(err => {
                console.error(err)
                alert("로그인 후 이용가능합니다")
                navigate('/login')
            })

        if (postId) {
            axios.get(`/posts/${postId}`)
                .then(res => {
                    const data = res.data
                    setTitle(data.title)
                    setContent(data.content)
                    setAuthor(data.author)
                })
                .catch(err => {
                    console.error("글 불러오기 실패", err)
                })
        }
    }, [postId])
    useEffect(() => {
        if (userinfo.username) {
            setAuthor(userinfo.username)
            setUserid(userinfo.userid)
        }
    }, [userinfo])

    // 글 등록 
    const handleSubmit = (e) => {
        e.preventDefault()
        const content = editorRef.current.getInstance().getHTML() //toast ui 쓰기 위해 등록 버튼 클릭시 내용 가져오기
        const newPost = {
            title,
            content,
            author,
            date: new Date().toISOString().split('T')[0], // 날짜 형식: YYYY-MM-DD
            views: 0,
            userid,
        }

        axios.post("/posts/commit", newPost)
            .then(() => {
                alert("글이 등록되었습니다!")
                navigate("/boardlist")
            })
            .catch(err => {
                console.error("등록 실패", err)
            })
    }

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
                        placeholder={userinfo.username}
                        value={author}
                        disabled
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
                                    const formData = new FormData()
                                    formData.append('image', blob)

                                    try {
                                        const res = await axios.post("/api/upload-image", formData, {
                                            headers: { 'Content-Type': 'multipart/form-data' }
                                        })

                                        callback(res.data, 'image') // Toast UI에 삽입
                                        console.log(res.data)
                                    } catch (err) {
                                        console.error("이미지 업로드 실패", err)
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* 버튼 */}
                <div style={{ textAlign: "center" }}>
                    <button
                        type="submit"
                        className="post-button"
                        style={{ marginRight: "10px" }}
                    >
                        등록
                    </button>
                    <Link to="/boardlist">
                        <button type="button" className="post-button">
                            목록
                        </button>
                    </Link>
                </div>

            </form>
        </div>
    )
}

export default PostWrite
