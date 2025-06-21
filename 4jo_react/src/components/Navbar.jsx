import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import './Navbar.css';
import axios from 'axios';

function Navbar() {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);

    // 로그아웃 관련
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
                setIsLoggedIn(true);
            })
            .catch(() => {
                setIsLoggedIn(false);
            });
    }, []);


    window.addEventListener('resize', showButton);

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

                        {/* 드롭다운 메뉴 */}
                        <li className='nav-item dropdown'>
                            <span className='nav-links'>게시판</span>
                            <ul className='dropdown-menu'>
                                <li>
                                    <Link to='/boardlist'>
                                        정보게시판
                                    </Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    {/* {button && <button className='btn-primary btn-medium'>
                        <Link to='/Login'>로그인</Link>
                    </button> */}
                    {isLoggedIn ? (
                        <>
                            <button onClick={() => { navigate('/Mypage') }}>마이페이지</button>
                            <button onClick={() => { handleLogout(); }}>로그아웃</button>
                        </>
                    ) : (
                        <Link to="/login">로그인</Link>
                    )}
                </div>
            </nav >
        </>
    );
}

export default Navbar