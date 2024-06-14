
import React, { useState } from 'react';
import axios from 'axios';
//import email_icon from '../Assets/email.png'
import Proconnect from './Assets/logo4.png';
import { Link } from 'react-router-dom';
import password_icon from './Assets/padlock.png'
import user_icon from './Assets/user.png'


const Register =()=>{
  const [Nom, setNom] = useState('');
  const [Prenom, setPrenom] = useState('');
  const [Date_Naissance, setDate_Naissance] = useState('');
  const [NomEntreprise, setNomEntreprise] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5017/api/Auth', {
            Nom,
            Prenom,
            Date_Naissance,
            NomEntreprise,
            Email,
            Password,
            ConfirmPassword
          },
          {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
          console.log(response);
        } catch (error) {
          if (error.response && error.response.data && error.response.data.errors) {
            const errorMessages = Object.values(error.response.data.errors).flat();
            setError(errorMessages);
          } else if (error.response) {
            setError(error.response.data);
          }
      }
    };
  return(
    <div className='parent-container' style={{ display: 'flex' }}><div className='image'>
      <div className='image-container'>
          <img src={Proconnect} alt=""  style={{ width: '300px', height: '250px' }} ></img>
      </div>
      <div className='image-text'>Enregistez vous à l'Excellence Professionnelle</div>
    </div>
    <div className='container'>   
      <div className='content-container'>
        <div className='header' >
          <div className='text'>
            <span className='welcome-back'>Welcome Back !</span><br />
            <span style={{ color: '#1836B2', fontSize: '12px', fontWeight: 700}}>Creez votre compte professionelle sur </span>
            <span style={{ color: '#86C7ED', fontSize: '12px', fontWeight: 700 }}> Pro</span>
            <span style={{ color: '#CB6CE6', fontSize: '12px', fontWeight: 700 }}>Connect</span>
          </div>  
          <form onSubmit={handleSubmit}>
            <div className='input'>
                <img src={user_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
                <input type="text" id="Nom" name="Nom" placeholder='Entrer votre nom' value={Nom} onChange={(e) => setNom(e.target.value)} required/>
            </div>
            <div className='input'>
                <img src={user_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
                <input type="text" id="Prenom" name="Prenom" placeholder='Entrer votre prenom' value={Prenom} onChange={(e) => setPrenom(e.target.value)} required />
            </div>
            <div className='input'>
                <img src={user_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
                <input type="date" id="Date_Naissance" name="Date_Naissance" placeholder='Entrer votre date de naissance' value={Date_Naissance} onChange={(e) => setDate_Naissance(e.target.value)} required />
            </div>
            <div className='input'>
                <img src={user_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
                <input type="text" id="Nom_Entreprise" name="Nom_Entreprise" placeholder="Entrer le nom d'entreprise" value={NomEntreprise} onChange={(e) => setNomEntreprise(e.target.value)} required />
            </div>
            <div className='input'>
                <img src={user_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
                <input type="email" id="Email" name="Email" placeholder="Entrer votre email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className='input'>
              <img src={password_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
              <input type="password" id="Password" name="Password" placeholder='Entrer votre mot de passe' value={Password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className='input'>
              <img src={password_icon} alt="" style={{ width: '15px', height: '15px' }}></img>
              <input type="password" id="ConfirmPassword" name="ConfirmPassword" placeholder='Confirmer le mot de passe' value={ConfirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            </div>
            {error && <div className="error" style={{ color: 'red'}}>{error}</div>}
            <div className="submit-container">
                <div className="submit1">
                    <button type="submit" style={{ color: 'white', textDecoration: 'none', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
                </div>
            </div>
          </form>               

           <div className="forgot-password"><Link to='/'style={{ color: '#86C7ED',textDecoration: 'none' }}>Vous avez deja un compte ?</Link>
            </div>
        </div></div></div></div>
    )
}
export default Register;

