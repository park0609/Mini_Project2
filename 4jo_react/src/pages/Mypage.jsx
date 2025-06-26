import { useState, useEffect } from 'react';
import axios from 'axios';
import './Mypage.css';
import { useNavigate } from 'react-router-dom';

function Mypage() {
    const [userinfo, setUserinfo] = useState(null);
    const [myPosts, setMyPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/search-cookie', { withCredentials: true })
            .then(res => {
                setUserinfo(res.data);
                console.log("사용자 정보:", res.data);

                const userid = res.data.userid;

                // 내가 쓴 글 가져오기
                axios.get(`/mypage/${userid}/my-posts`)
                    .then(res => {
                        setMyPosts(res.data);
                        console.log("내가 쓴 글:", res.data);
                    })
                    .catch(err => {
                        console.error("내가 쓴 글 가져오기 실패", err);
                    });

                // 내가 좋아요한 글 가져오기
                axios.get(`/mypage/${userid}/liked-posts`)
                    .then(res => {
                        setLikedPosts(res.data);
                        console.log("내가 좋아요한 글:", res.data);
                    })
                    .catch(err => {
                        console.error("좋아요한 글 가져오기 실패", err);
                    });

            })
            .catch(err => {
                console.error(err);
                alert("인증 실패 또는 서버 오류");
            });
    }, []);

    return (
        <div className='My-page'>
            <div>
                <h1>사용자 정보</h1>
                {userinfo ? (
                    <div>
                        <p><strong>아이디:</strong> {userinfo.userid}</p>
                        <p><strong>이름:</strong> {userinfo.username}</p>
                        <p><strong>전화번호:</strong> {userinfo.phone}</p>
                        <p><strong>이메일:</strong> {userinfo.email}</p>
                        <p><strong>주소:</strong> {userinfo.address}</p>
                        <div><button onClick={() => { navigate('/Mypage/Modifyprofile') }}>회원정보 수정하기</button></div>
                    </div>
                ) : (
                    <p>정보를 불러오는 중...</p>
                )}
            </div>

            <div className="My-posts">
                <h2>내가 작성한 글</h2>
                {myPosts.length === 0 ? <p>작성한 글이 없습니다.</p> : (
                    <ul>
                        {myPosts.map(post => (
                            <li key={post.freeIndex} onClick={() => { navigate(`/postView?no=${post.id}`) }} style={{ cursor: 'pointer' }}>
                                <strong>{post.title}</strong> {post.viewer}- like:{post.likeCount}- {post.freeDate}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="Liked-posts">
                <h2>내가 좋아요한 글</h2>
                {likedPosts.length === 0 ? <p>좋아요한 글이 없습니다.</p> : (
                    <ul>
                        {likedPosts.map(post => (
                            <li key={post.freeIndex} onClick={() => { navigate(`/postView?no=${post.id}`) }} style={{ cursor: 'pointer' }}>
                                <strong>{post.title}</strong> - {post.freeDate}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Mypage;