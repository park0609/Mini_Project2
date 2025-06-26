import { useState, useEffect } from 'react';
import axios from 'axios';
import DaumPostcode from 'react-daum-postcode';  // 다음주소찾기
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { jsx } from 'react/jsx-runtime';
import { CenturyView } from 'react-calendar';


function Login() {
  const [loginchange, setLoginchange] = useState(false); // 로그인,회원가입 창 변경
  const [domain, setDomain] = useState('');         // 이메일 직접입력 인풋 나오게
  const [customDomain, setCustomDomain] = useState('');
  const [isCustom, setIsCustom] = useState(false);


  const navigate = useNavigate();

  // 회원 정보들
  const [chkPassword, setChkPassword] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [detailadd, setDetailadd] = useState('');
  const [userinfo, setUserinfo] = useState({
    username: '',
    userid: '',
    myPassword: '',
    phone: ''
  });
  const finalEmail = `${email}${isCustom ? customDomain : domain}`;
  const finaladd = `${address} ${detailadd}`;

  // 회원정보 변경 핸들러
  const handleUserinfo = (e) => {
    const { name, value } = e.target;
    setUserinfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 로그인버튼
  const handleLogin = () => {
    axios.post('/login', {
      userid: userinfo.userid,
      password: userinfo.myPassword
    }, { withCredentials: true })
      .then(res => {
        if (res.status === 200) {
          alert("로그인 성공");
          navigate('/');
          localStorage.setItem('expiresAt', res.data['expiresAt'])
          setUserinfo({
            username: '',
            userid: '',
            myPassword: '',
            phone: ''
          })
        }
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          alert("아이디 또는 비밀번호가 틀렸습니다.");
        } else {
          console.error(err);
          alert("서버 오류");
        }
      });
  };

  // 회원가입 버튼 스프링부트로 POST 요청
  const handleSignup = () => {
    if (userinfo.username == "") {
      alert("이름을 입력해주세요")
    } else if (userinfo.userid == "") {
      alert("아이디를 입력해주세요")
    } else if (userinfo.myPassword == "") {
      alert("비밀번호를 입력해주세요")
    } else if (userinfo.myPassword != chkPassword) {
      alert("비밀번호 확인요망")
    } else if (userinfo.phone == "") {
      alert("전화번호를 입력해주세요")
    } else if (userinfo.email == "") {
      alert("이메일을 입력해주세요")
    } else if (isCustom ? customDomain : domain == "") {
      alert("메일을 선택해주세요")
    }
    else if (userinfo.address == "") {
      alert("주소를 입력해주세요")
    }
    else {
      axios.post('/signup', {
        username: userinfo.username,
        userid: userinfo.userid,
        password: userinfo.myPassword,
        phone: userinfo.phone,
        email: finalEmail,
        address: finaladd
      })
        .then(res => {
          if (res.status === 200) {
            alert("회원가입 완료");
            console.log(res.data);
            setUserinfo({
              username: '',
              userid: '',
              myPassword: '',
              phone: ''
            })
            setLoginchange(false);
          }
        })
        .catch(err => {
          if (err.response) {
            if (err.response.status === 400) {
              alert("회원가입 실패: 잘못된 입력");
            } else if (err.response.status === 409) {
              alert("중복된 ID 혹은 이름")
            }
            else {
              alert(`서버 오류: ${err.response.status}`);
            }
          } else {
            console.error(err);
            alert("네트워크 오류");
          }
        });
    }
  };


  // 이메일 도메인 직접입력 변경
  const handleDomainChange = (e) => {
    const value = e.target.value;
    if (value === 'custom') {
      setIsCustom(true);
      setDomain('');
    } else {
      setIsCustom(false);
      setDomain(value);
    }
  };

  // 주소입력
  const [isOpen, setIsOpen] = useState(false);
  const handleComplete = (data) => {
    setAddress(data.roadAddress || data.jibunAddress);
    setIsOpen(false);
  };


  return (
    <div className='login-page'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)',
        fontFamily: 'Arial ,sans-serif'
      }}>
      {loginchange ?
        <>
          <h1 className='head'>회원가입</h1>
          <div>
            <label>이름: </label>
            <input
              type="text"
              name='username'
              value={userinfo.username}
              onChange={handleUserinfo}
            />
            <label>아이디: </label>
            <input
              type="text"
              name='userid'
              value={userinfo.userid}
              onChange={handleUserinfo}
            />
            <label>비밀번호: </label>
            <input
              type="password"
              name='myPassword'
              value={userinfo.myPassword}
              onChange={handleUserinfo}
            />
            <label>비밀번호 확인: </label>
            <input
              type="password"
              value={chkPassword}
              onChange={(e) => setChkPassword(e.target.value)}
            />
            <label>전화번호: </label>
            <input
              type="text"
              name='phone'
              value={userinfo.phone}
              onChange={handleUserinfo}
            />
            <label>이메일: </label>
            <input
              type="text"
              value={userinfo.email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {isCustom ? (
              <input
                type="text"
                placeholder="직접 입력"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
              />
            ) : (<></>)}
            <select onChange={handleDomainChange}>
              <option value="">선택하세요</option>
              <option value="@naver.com">@naver.com</option>
              <option value="@daum.com">@daum.com</option>
              <option value="@google.com">@google.com</option>
              <option value="custom">직접입력</option>
            </select>
            <input type="text"
              disabled
              value={email ? finalEmail : ""} />
            <button onClick={() => setIsOpen(true)}>주소찾기</button>
            <label>세부주소: </label>
            {address && <input type="text" onChange={(e) => setDetailadd(e.target.value)} />}
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
            <button onClick={() => {
              handleSignup();
              setChkPassword("");
            }}>회원가입</button>
            <button onClick={() => {
              setLoginchange(false);
              setChkPassword("");
              setUserinfo({
                username: '',
                userid: '',
                myPassword: '',
                phone: ''
              })
            }} >로그인 하러가기</button>
          </div>
        </>
        :
        <>
          <h1 className='head'>로그인</h1>
          <div>
            <label>아이디: </label>
            <input
              type="text"
              name='userid'
              value={userinfo.userid}
              onChange={handleUserinfo}
            />
            <label>비밀번호: </label>
            <input
              type="password"
              name='myPassword'
              value={userinfo.myPassword}
              onChange={handleUserinfo}
            />
            <button onClick={() => {
              handleLogin();
              setChkPassword("");
            }}>로그인</button>
            <div className='btn-line'>
              <button className="link-btn" onClick={() => {
                setLoginchange(true);
                setChkPassword("");
                setUserinfo({
                  username: '',
                  userid: '',
                  myPassword: '',
                  phone: ''
                })
              }}>회원가입 </button>
              <button className="link-btn" onClick={() => navigate('/Searchuser')}>아이디/비밀번호 찾기</button>
            </div>
          </div>
        </>
      }
    </div>


  );
}

export default Login;
