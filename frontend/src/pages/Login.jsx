import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(data));
            dispatch(setUser(data));
            navigate('/');
        } else {
            alert(data.message);
        }
    };

    return (
        <div className='auth-container'>
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <input
                    type='email'
                    name='email'
                    value={email}
                    placeholder='Email'
                    onChange={onChange}
                />
                <input
                    type='password'
                    name='password'
                    value={password}
                    placeholder='Password'
                    onChange={onChange}
                />
                <button type='submit'>Login</button>
            </form>
            <p onClick={() => navigate('/register')}>
                Nuk ke llogari? Regjistrohu
            </p>
        </div>
    );
};

export default Login;