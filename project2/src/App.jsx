import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [myUserid, setMyUserid] = useState('');
  const [myPassword, setMyPassword] = useState('');
  const [chkPassword, setChkPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loginchange, setLoginchange] = useState(false);
  const [domain, setDomain] = useState('');
  const [customDomain, setCustomDomain] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [address, setAddress] = useState('');
  const finalEmail = `${email}@${isCustom ? customDomain : domain}`;



  const handleLogin = () => {
    axios.post('/login', {
      userid: myUserid,
      password: myPassword
    })
      .then(res => {
        if (res.status === 200) {
          alert("로그인 성공");
          console.log(res.data);
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


  const handleSignup = () => {
    if (nickname == "") {
      alert("이름을 입력해주세요")
    } else if (myUserid == "") {
      alert("아이디를 입력해주세요")
    } else if (myPassword == "") {
      alert("비밀번호를 입력해주세요")
    } else if (myPassword != chkPassword) {
      alert("비밀번호 확인요망")
    } else {
      axios.post('/signup', {
        username: nickname,
        userid: myUserid,
        password: myPassword
      })
        .then(res => {
          if (res.status === 200) {
            alert("회원가입 완료");
            console.log(res.data);
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

  // const openAddressPopup = () => {
  //   const popup = window.open(
  //     'https://business.juso.go.kr/addrlink/addrLinkUrl.do?confmKey=devU01TX0FVVEgyMDI1MDYxNjExMzgzNzExNTg0NzQ%3D&returnUrl=http://localhost:8080/juso',
  //     'addrPopup',
  //     'width=570,height=420,scrollbars=yes,resizeable=yes'
  //   );




  return (
    <>
      {loginchange ?
        <>
          <h1>회원가입</h1>
          <div>
            <label>이름: </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>

          <div>
            <label>아이디: </label>
            <input
              type="text"
              value={myUserid}
              onChange={(e) => setMyUserid(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호: </label>
            <input
              type="password"
              value={myPassword}
              onChange={(e) => setMyPassword(e.target.value)}
            />
          </div>
          <div>
            <label>비밀번호 확인: </label>
            <input
              type="password"
              value={chkPassword}
              onChange={(e) => setChkPassword(e.target.value)}
            />
          </div>
          <div>
            <label>전화번호: </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label>이메일: </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            @
            {isCustom ? (
              <input
                type="text"
                placeholder="직접 입력"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
              />
            ) : (
              <select onChange={handleDomainChange}>
                <option value="">선택하세요</option>
                <option value="naver.com">naver.com</option>
                <option value="daum.com">daum.com</option>
                <option value="google.com">google.com</option>
                <option value="custom">직접입력</option>
              </select>
            )}
            <div>{finalEmail}</div>
          </div>
          <div>
            <label>주소: </label>
            <button>주소찾기</button>
            <div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <button onClick={handleSignup}>회원가입</button>
          <button onClick={() => { setLoginchange(false) }} >로그인 하러가기</button>
        </>
        :
        <>
          <h1>로그인 테스트</h1>
          <div>
            <label>아이디: </label>
            <input
              type="text"
              value={myUserid}
              onChange={(e) => setMyUserid(e.target.value)}
            />

          </div>
          <div>
            <label>비밀번호: </label>
            <input
              type="password"
              value={myPassword}
              onChange={(e) => setMyPassword(e.target.value)}
            />
          </div>
          <button onClick={handleLogin}>로그인</button>
          <button onClick={() => {
            setLoginchange(true);
            setMyUserid("");
            setMyPassword("");
          }}>회원가입 </button>
        </>
      }
    </>


  );
}

export default App;
