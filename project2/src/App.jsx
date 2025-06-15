import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [myUsername, setMyUsername] = useState('');
  const [myPassword, setMyPassword] = useState('');

  const handleLogin = () => {
    axios.post('/login', {
      username: myUsername,
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

  return (
    <>
      <h1>Login Test</h1>

      <div>
        <label>Username: </label>
        <input
          type="text"
          value={myUsername}
          onChange={(e) => setMyUsername(e.target.value)}
        />
      </div>

      <div>
        <label>Password: </label>
        <input
          type="password"
          value={myPassword}
          onChange={(e) => setMyPassword(e.target.value)}
        />
      </div>

      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default App;
