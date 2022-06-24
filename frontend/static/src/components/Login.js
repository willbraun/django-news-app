import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { handleError } from './../helpers';
import './../styles/login.css'

const Login = ({appState, setAppState}) => {
    const [state, setState] = useState({
        username: '',
        password: '',
    })

    let navigate = useNavigate();

    const handleInput = (e) => {
        const {name, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken'),
            },
            body: JSON.stringify(state),
        }

        const response = await fetch("/dj-rest-auth/login/", options).catch(handleError);

        if (!response.ok) {
            throw new Error('Network response not ok!');
        }

        const data = await response.json();
        Cookies.set("Authorization", `Token ${data.key}`);
        navigate('/');
        setAppState({...appState, auth: true, superUser: data.is_superuser, authorId: data.id});
    }
  
    return (
        <div className="auth-background">
            <main className="login-box">
                <h1>Food News</h1>
                <h2>Log In</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input 
                            name="username" 
                            value={state.username} 
                            type="text" 
                            id="username" 
                            required 
                            onChange={handleInput}/>
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input 
                            name="password" 
                            value={state.password} 
                            type="password" 
                            id="password" 
                            required 
                            onChange={handleInput}/>
                    </div>
                    <button type="submit">Log In</button>
                </form>
                <p>Don't have an account? Click <span className="create-account-link" onClick={() => navigate('/create-account')}>here</span> to create one.</p>
            </main>
        </div>
        
    );
}

export default Login;