import { useNavigate } from 'react-router-dom'
import './Modifyprofile.css'
import axios from 'axios'
import { useState, useEffect } from 'react';


function Modifyprofile() {

    const navigate = useNavigate()

    const [userinfo, setUserinfo] = useState({
        userid: '',
        username: '',
        myPassword: '',
        phone: '',
        email: '',
        address: ''
    });

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserinfo(prev => ({
            ...prev,
            [name]: value
        }));
    };



    return (
        <>
            <div className='modify-page'>
                <div>
                    <h1>회원정보 수정</h1>
                    <label>아이디:</label>
                    <input type="text" name="userid" value={userinfo.userid} readOnly />

                    <label>이름:</label>
                    <input type="text" name="username" value={userinfo.username} onChange={handleChange} />

                    <label>비밀번호:</label>
                    <input type="password" name="myPassword" value={userinfo.myPassword} onChange={handleChange} />

                    <label>전화번호:</label>
                    <input type="text" name="phone" value={userinfo.phone} onChange={handleChange} />

                    <label>이메일:</label>
                    <input type="text" name="email" value={userinfo.email} onChange={handleChange} />

                    <label>주소:</label>
                    <input type="text" name="address" value={userinfo.address} onChange={handleChange} />

                    <button>수정하기</button>
                    <button onClick={() => navigate('/Mypage')}>뒤로가기</button>
                </div>
            </div>
        </>
    )
}

export default Modifyprofile