import axios from 'axios';
import './Searchuser.css'
import { useState } from 'react';

function Searchuser() {


    const [password, setPassword] = useState('')
    const [userid, setUserid] = useState('')
    const [foundIds, setFoundIds] = useState([]);
    const [foundpw, setFoundPw] = useState('');




    const handleFindId = () => {
        axios.post('/find-id', { password: password })
            .then(res => {
                setFoundIds(res.data.ids);
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    alert("일치하는 ID가 없습니다");
                    setFoundIds([]);
                } else {
                    alert("서버 오류");
                    console.error(err);
                }
            });
    }
    const handleFindPw = () => {
        axios.post('/find-pw', { userid: userid })
            .then(res => {
                const pw = res.data.pw;  // 서버에서 받은 비밀번호
                setFoundPw(pw);          // 필요하면 상태에도 저장
                alert(`임시 비밀번호는 ${pw} 입니다`);
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    alert("일치하는 ID가 없습니다");
                } else {
                    alert("서버 오류");
                    console.error(err);
                }
            });
    }

    return (
        <>
            <div className='search-page'>
                <h1 className='head'>아이디 / 비밀번호 찾기</h1>
                <div>
                    <div>
                        <h2>아이디 찾기</h2>
                        <label>비밀번호:</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={() => handleFindId()}>찾기</button>
                    </div>
                    <div>
                        <h2>비밀번호 찾기(임시 비밀번호 생성)</h2>
                        <label>아이디:</label>
                        <input type="text" onChange={(e) => setUserid(e.target.value)} />
                        <button onClick={() => handleFindPw()}>찾기</button>
                    </div>
                </div>
                {foundIds.length > 0 && (
                    <div className="result">
                        <h3>찾은 ID 목록</h3>
                        <ul>
                            {foundIds.map((id, index) => (
                                <li key={index}>{id}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default Searchuser