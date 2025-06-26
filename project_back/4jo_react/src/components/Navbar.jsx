import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';

function Navbar() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [username, setUsername] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [remainingTime, setRemainingTime] = useState(0);
    const timerRef = useRef(null);
    const navigate = useNavigate();

    // 로그아웃 관련
    const handleLogout = () => {
        axios.post('/logout', {}, { withCredentials: true })
            .then(() => {
                setIsLoggedIn(false);
                navigate("/");
                window.location.reload();
            })
            .catch(err => {
                console.error("Logout failed", err);
            });
    };

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);


    // 화면 크기에 따라서 버튼이 보이고 안보이도록 설정한다. 
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false)
        }
        else {
            setButton(true);
        }
    };

    // SIGNUP버튼이 사이즈가 줄어들면 없어지도록 한다. 
    useEffect(() => {
        showButton();

        axios.get('/checklog', { withCredentials: true })
            .then(res => {
                setUsername(res.data.username);
                setIsLoggedIn(true);
                const expiresAt = parseInt(localStorage.getItem("expiresAt"), 10);
                if (expiresAt) {
                    startSessionTimer(expiresAt);
                }
            })
            .catch(() => {
                setIsLoggedIn(false);
            });

        window.addEventListener('resize', showButton);

        return () => {
            window.removeEventListener('resize', showButton);
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [navigate]);

    const startSessionTimer = (expiresAt) => {
        if (timerRef.current) clearTimeout(timerRef.current);

        const updateTimer = () => {
            const remainingMs = expiresAt - Date.now();
            const remainingSec = Math.max(0, Math.floor(remainingMs / 1000));

            setRemainingTime(remainingSec);

            if (remainingSec <= 0) {
                alert("세션이 만료되었습니다.");
                handleLogout();
            } else {
                timerRef.current = setTimeout(updateTimer, 1000);
            }
        };

        updateTimer();  // 첫 즉시 호출
    };

    const extendSession = () => {
        const newExpiresAt = Date.now() + 30 * 60 * 1000;
        localStorage.setItem("expiresAt", newExpiresAt);
        startSessionTimer(newExpiresAt);
    };

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    {/* 모바일버전에서 클릭하면 메뉴 보이도록 설정하는 것도 한다. (close Mobile Menu)는 다시 버튼 누르면 없어지고 생기고 하도록 한다.  */}
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        장 유
                        <i className='fab fa-typo3' />
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>

                        <li className='nav-item'>
                            <Link to='/certinfo' className='nav-links' onClick={closeMobileMenu}>
                                정보자격증
                            </Link>
                        </li>

                        {/* 드롭다운 메뉴 */}
                        <li className='nav-item-dropdown'>
                            <span className='nav-links'><Link to='/boardlist'>
                                게시판
                            </Link></span>
                        </li>
                    </ul>
                    {isLoggedIn === null ? null : (
                        isLoggedIn ? (
                            <>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <p>{formatTime(remainingTime)}</p>
                                    <button onClick={extendSession} className='nav-button-time'>시간 연장</button>
                                </div>
                                <p className='login-name'>{username}</p>
                                <button onClick={() => navigate('/Mypage')} className='nav-button'>마이페이지</button>
                                <button onClick={handleLogout} className='nav-button'>로그아웃</button>
                            </>
                        ) : (
                            <Link to="/login"><div className='nav-login'>로그인</div></Link>
                        )
                    )}
                </div>
            </nav >
        </>
    );
}

export default Navbar