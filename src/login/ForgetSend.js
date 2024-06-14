import './Login.css'
import React from 'react'


import Proconnect from './Assets/logo4.png'


const ForgetPassword =()=>{
   
    return(<div className='parent-container' style={{ display: 'flex' }}><div className='image'>
      <div className='image-container'>
          
          
      <img src={Proconnect} alt=""  style={{ width: '300px', height: '250px' }} ></img>
      </div><div className='image-text'>Connectez-vous à l'Excellence Professionnelle</div></div>
        <div className='container-2'>
           
      <div className='content-container'>
      <div className='header' >
            <div className='text'><span className='reintialiser'>
            Réinitialiser le mot de passe!</span><br />
    <span className='rein' style={{ color: '#1836B2', fontSize: '12px', fontWeight: 700,marginLeft:'35px;'}}>Réinitialisez votre mot de passe avec </span>
    
    <span style={{ color: '#86C7ED', fontSize: '12px', fontWeight: 700 }}> Pro</span>
    <span style={{ color: '#CB6CE6', fontSize: '12px', fontWeight: 700 }}>Connect</span>
</div>
<div className='inter'>
<div className='int'>Un courriel a été expédié à votre adresse e-mail.</div>

</div></div>

</div></div></div>
    )
}
export default ForgetPassword;

