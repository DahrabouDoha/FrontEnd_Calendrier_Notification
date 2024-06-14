import './Login.css'
import React from 'react'
import  { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import user_icon from './Assets/user.png'
import Proconnect from './Assets/logo4.png'
// import password_icon from '../Assets/padlock.png'

const ForgetPassword =()=>{
    const [email, setEmail] = useState('');

    const handleResetPassword = async () => {
        try {
            const response = await axios.post(`http://localhost:5017/api/Auth/ForgetPassword/${email}`);

            // Afficher un message de succès ou d'échec selon la réponse du serveur
            console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe:', error.message);
        }
    };
    // const [action,setAction]=useState("Login")
    return(
        <div className='parent-container' style={{ display: 'flex' }}>
            <div className='image'>
                <div className='image-container'>
                    <img src={Proconnect} alt=""  style={{ width: '300px', height: '250px' }} ></img>
                </div>
                <div className='image-text'>Connectez-vous à l'Excellence Professionnelle</div>
            </div>
            <div className='container1'>
                <div className='content-container'>
                    <div className='header' >
                        <div className='text'>
                            <span className='reintialiser'>Réinitialiser le mot de passe!</span><br/>
                            <span className='rein' style={{ color: '#1836B2', fontSize: '12px', fontWeight: 700,marginLeft:'35px;'}}>Réinitialisez votre mot de passe avec </span>
                            <span style={{ color: '#86C7ED', fontSize: '12px', fontWeight: 700 }}> Pro</span>
                            <span style={{ color: '#CB6CE6', fontSize: '12px', fontWeight: 700 }}>Connect</span>
                        </div>
                        <div className='inter'>
                            <div className='int'>Veuillez fournir votre adresse e-mail et nous vous enverrons les instructions nécessaires.</div>
                        </div>
                        <div className='inputs1'>
                            <div className='input'>
                                <img src={user_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Entrer Votre Propre Email'></input>
                            </div>
                        </div>
                        <div ClassName="submit-container">
                            <div className="submit">
                                <Link to='/forget-send' style={{ color: 'white', textDecoration: 'none' }} onClick={handleResetPassword}>Réinitialiser</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ForgetPassword;

