import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import padlock from "../../assets/padlock.png"
import mpLogo from "../../assets/mpLogo.png"


export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    async function login(e){
        //Evita o recarregamento da página
        e.preventDefault();

        const data = {
            userName,
            password
        };

        try{
            const response = await api.post('api/auth/v1/signin', data);

            localStorage.setItem('userName', userName);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            navigate('/books');

        }catch(error){
            alert('Login failed! Try again!');
        }
    }

    return(        
            <div className="Login-container">

                <section className="form">
                <img src={mpLogo} alt="Erudio Logo" />
                <form onSubmit={login}>
                    <h1>Access your Account</h1>
                    <input 
                        placeholder="Username"
                        value={userName}
                        onChange={e => setUserName(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>
                </form>
                </section>

                <img src={padlock} alt="Login" />

            </div>
    );
}