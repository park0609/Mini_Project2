import { useState, useEffect } from 'react'
import axios from 'axios';
import './Mypage.css'
import { useNavigate } from 'react-router-dom'


function Mypage() {
    const [userinfo, setUserinfo] = useState([]);


    useEffect(() => {
        axios.get('/search-cookie', { withCredentials: true })
            .then(res => {
                setUserinfo(res.data)
                console.log("사용자 정보:", res.data);
                // 화면에 사용자 정보 표시
            })
            .catch(err => {
                console.error(err);
                alert("인증 실패 또는 서버 오류");
            });
    }, []);

    const navigate = useNavigate()

    return (
        <>
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

                        </div>
                    ) : (
                        <p>정보를 불러오는 중...</p>
                    )}
                    <div><button onClick={() => { navigate('/Mypage/Modifyprofile') }}>회원정보 수정하기</button></div>
                </div>
            </div>
        </>
    )

}

export default Mypage