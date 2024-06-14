import React, { useState } from 'react';
import axios from 'axios';
import password_icon from './Assets/padlock.png';
import user_icon from './Assets/user.png';
import Proconnect from './Assets/logo4.png';
import { Link } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5103/api/Account', {
                email,
                password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Assuming your backend returns a JWT token
            const token = response.data.result.jwtToken;
            // Store the token in local storagey
            localStorage.setItem('token', token);
            // Redirect or do something else upon successful login
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return(
        <div className='parent-container' style={{ display: 'flex' }}>
            <div className='image'>
                <div className='image-container'>  
                    <img src={Proconnect} alt=""  style={{ width: '300px', height: '250px' }} ></img>
                </div>
                <div className='image-text'>Connectez-vous à l'Excellence Professionnelle</div>
            </div>
            <div className='container'>     
                <div className='content-container'>
                    <div className='header' >
                        <div className='text'>
                            <span className='welcome-back'>Welcome Back !</span><br />
                            <span style={{ color: '#1836B2', fontSize: '12px', fontWeight: 700}}>Connectez-vous pour continuer sur </span>
                            <span style={{ color: '#86C7ED', fontSize: '12px', fontWeight: 700 }}> Pro</span>
                            <span style={{ color: '#CB6CE6', fontSize: '12px', fontWeight: 700 }}>Connect</span>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='input'>
                                <img src={user_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
                                <input type="email" id="Email" name="Email" placeholder='Entrer votre email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className='input'>
                                <img src={password_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
                                <input type="password" id="Password" name="Password" placeholder='Entrer votre mot de passe' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            {error && <div className="error">{error}</div>}
                            <div className="submit-container">
                                <div className="submit1">
                                    <button type="submit" style={{ color: 'white', textDecoration: 'none', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
                                </div>
                            </div>
                            <div className="forgot-password">
                                <Link to='/forget-password'style={{ color: '#86C7ED',textDecoration: 'none' }}>Vous avez oublié votre mot de passe ?</Link>
                            </div>
                            <div className="submit1"><Link to='/Register'style={{ color: 'white',textDecoration: 'none', cursor: 'pointer'  }}>Register</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;