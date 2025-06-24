import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';
import axios from 'axios';

function Navbar() {

    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [username, setUsername] = useState('');

    // 로그아웃 관련
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const navigate = useNavigate();
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

        //로그아웃관련
        axios.get('/checklog', { withCredentials: true })
            .then(res => {
                setUsername(res.data.username);
                console.log(res.data.username)
                setIsLoggedIn(true);
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, [navigate]);

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
                        자격증
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
                            <Link to='/qualipage' className='nav-links' onClick={closeMobileMenu}>
                                정보자격증
                            </Link>
                        </li>

                        {/* 드롭다운 메뉴 */}
                        <li className='nav-item dropdown'>
                            <span className='nav-links'><Link to='/boardlist'>
                                게시판
                            </Link></span>
                            <ul className='dropdown-menu'>
                                <li>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/* {button && <button className='btn-primary btn-medium'>
                        <Link to='/Login'>로그인</Link>
                    </button> */}
                    {isLoggedIn === null ? null : (
                        isLoggedIn ? (
                            <>
                                <p>{username}</p>
                                <button onClick={() => { navigate('/Mypage') }}>마이페이지</button>
                                <button onClick={() => { handleLogout(); }}>로그아웃</button>
                            </>
                        ) : (
                            <Link to="/login">로그인</Link>
                        )
                    )}
                </div>
            </nav >
        </>
    );
}

export default Navbar