import { useState } from 'react';
import UserPool from '../../UserPool';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    UserPool.signUp(email, password, [], null, (err, data) => {
      if (err) {
        setError(err.message);
      } else {
        console.log(data);
      }
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" className="login-btn">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
