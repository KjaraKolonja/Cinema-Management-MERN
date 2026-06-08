import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/slices/userSlice';
import logo from '../assets/logo.png';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const handleLogout = () => {
        localStorage.removeItem('user');
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <header className='header'>
            <div className='logo' onClick={() => navigate('/')}>
                <img src={logo} alt='CinemaApp' width="42" height="42" />
                <span>CinemaApp</span>
            </div>
            <nav>
                {user ? (
                    <div className='nav-right'>
                        <div className='user-badge'>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="4" fill="#3b82f6"/>
                            </svg>
                            <span>{user.name}</span>
                        </div>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <div className='nav-right'>
                        <button onClick={() => navigate('/login')}>Login</button>
                        <button onClick={() => navigate('/register')}>Register</button>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;