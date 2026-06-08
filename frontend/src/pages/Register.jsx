import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/slices/userSlice';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { name, email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
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
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <input
                    type='text'
                    name='name'
                    value={name}
                    placeholder='Emri'
                    onChange={onChange}
                />
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
                <button type='submit'>Register</button>
            </form>
            <p onClick={() => navigate('/login')}>
                Ke llogari? Kycu
            </p>
        </div>
    );
};

export default Register;