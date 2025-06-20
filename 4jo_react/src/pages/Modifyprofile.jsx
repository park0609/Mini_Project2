import { useNavigate } from 'react-router-dom'
import './Modifyprofile.css'
import axios from 'axios'


function Modifyprofile() {

    const navigate = useNavigate()






    return (
        <>
            <div className='modify-page'>
                <div>
                    <h1>회원정보 수정</h1>
                    <label >아이디:</label>
                    <input type="text" />
                    <label >이름:</label>
                    <input type="text" />
                    <label >비밀번호:</label>
                    <input type="text" />
                    <label >비밀번호 확인:</label>
                    <input type="password" />
                    <label >전화번호:</label>
                    <input type="text" />
                    <label >이메일:</label>
                    <input type="text" />
                    <label >주소:</label>
                    <input type="text" />
                    <button>수정하기</button>
                    <button onClick={() => navigate('/Mypage')}>뒤로가기</button >
                </div>
            </div>
        </>
    )
}

export default Modifyprofile