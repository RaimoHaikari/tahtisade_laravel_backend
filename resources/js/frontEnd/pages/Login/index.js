import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

    const navigate  = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event) => {

        event.preventDefault();
        props.onLogin({
            username: username,
            password: password
        });
        navigate('/')

    }

    return (
        <div>
            <h2>Kirjaudu</h2>
            <form onSubmit={onSubmit}>

                <div>
                    username: 
                    <input 
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>

                <div>
                    password
                    <input 
                        type="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <button type='submit'>login</button>
            </form>
        </div>
    );
};

export default Login;