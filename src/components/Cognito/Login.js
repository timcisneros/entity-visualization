import { useState, useContext } from 'react';
import { AccountContext } from './Account';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { authenticate } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();
        authenticate(email, password)
            .then((data) => {
                window.location.reload();
                // console.log('Logged in!', data);
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    return (
        <div>
            {error && <div className="login-field error">{error}</div>}
            <form onSubmit={onSubmit}>
                <div className="login-field">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>

                <button type="submit" className="login-btn">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
