import { useNavigate } from 'react-router-dom'
import './Modifyprofile.css'
import axios from 'axios'
import DaumPostcode from 'react-daum-postcode';
import { useState, useEffect } from 'react';


function Modifyprofile() {

    const [detailadd, setDetailadd] = useState('');
    const [chkpassword, setChkpassword] = useState('');
    const navigate = useNavigate()

    const [userinfo, setUserinfo] = useState({
        userid: '',
        username: '',
        myPassword: '',
        phone: '',
        email: '',
        address: ''
    });

    // 로그아웃관련
    const handleLogout = () => {
        axios.post('/logout', {}, { withCredentials: true })
            .then(() => {
                navigate("/login");
            })
            .catch(err => {
                console.error("Logout failed", err);
            });
    };


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

    // 주소입력
    const [addressSelected, setAddressSelected] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleComplete = (data) => {
        setUserinfo(prev => ({
            ...prev,
            address: data.roadAddress || data.jibunAddress
        }));
        setAddressSelected(true);
        setIsOpen(false);
    };
    const finaladd = `${userinfo.address} ${detailadd}`;


    const handleModify = () => {
        // 유효성 검사 예시
        if (!userinfo.username) {
            alert("이름을 입력해주세요");
            return;
        }
        if (!userinfo.myPassword) {
            alert("비밀번호를 입력해주세요");
            return;
        }
        if (userinfo.myPassword !== chkpassword) {
            alert("비밀번호 확인이 일치하지 않습니다");
            return;
        }
        if (!userinfo.phone) {
            alert("전화번호를 입력해주세요");
            return;
        }
        if (!userinfo.email) {
            alert("이메일을 입력해주세요");
            return;
        }
        if (!userinfo.address) {
            alert("주소를 입력해주세요");
            return;
        }

        // 수정 요청
        axios.post('/modify-profile', {
            userid: userinfo.userid,
            username: userinfo.username,
            password: userinfo.myPassword,
            phone: userinfo.phone,
            email: userinfo.email,
            address: finaladd
        }, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    alert(`회원정보가 성공적으로 수정되었습니다. 다시 로그인 해주세요`);
                    handleLogout();
                } else {
                    alert(`수정 실패: ${res.status}`);
                }
            })
            .catch(err => {
                if (err.response) {
                    alert(`서버 오류: ${err.response.status}`);
                } else {
                    console.error(err);
                    alert("네트워크 오류");
                }
            });
    };



    return (
        <>
            <div className='modify-page'>
                <div>
                    <h1>회원정보 수정</h1>
                    <label>아이디:</label>
                    <input type="text" name="userid" value={userinfo.userid} readOnly />

                    <label>이름 변경:</label>
                    <input type="text" name="username" value={userinfo.username} onChange={handleChange} />

                    <label>비밀번호 변경:</label>
                    <input type="password" name="myPassword" value={userinfo.myPassword} onChange={handleChange} />
                    <label>비밀번호 확인</label>
                    <input type="password" name="chkpassword" value={chkpassword} onChange={(e) => { setChkpassword(e.target.value) }} />

                    <label>전화번호 변경:</label>
                    <input type="text" name="phone" value={userinfo.phone} onChange={handleChange} />

                    <label>이메일 변경:</label>
                    <input type="text" name="email" value={userinfo.email} onChange={handleChange} />

                    <button onClick={() => setIsOpen(true)}>주소찾기</button>
                    <label>세부주소: </label>
                    <input type="text" disabled={!addressSelected} onChange={(e) => setDetailadd(e.target.value)} />
                    <input type="text"
                        disabled
                        value={finaladd} />
                    {isOpen && (
                        <div style={{
                            position: 'fixed',
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            zIndex: 1000
                        }}>
                            <div style={{ background: '#fff', padding: '20px' }}>
                                <DaumPostcode
                                    onComplete={handleComplete}
                                    style={{ width: '400px', height: '400px' }}
                                />
                                <button onClick={() => setIsOpen(false)}>닫기</button>
                            </div>
                        </div>
                    )}
                    <button onClick={handleModify}>수정하기</button>
                    <button onClick={() => navigate('/Mypage')}>뒤로가기</button>
                </div>
            </div>
        </>
    )
}

export default Modifyprofile