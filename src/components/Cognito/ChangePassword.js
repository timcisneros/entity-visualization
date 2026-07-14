import { useState, useContext } from 'react';
import { AccountContext } from './Account';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const { getSession } = useContext(AccountContext);

    const onSubmit = (event) => {
        event.preventDefault();

        getSession().then(({ user }) => {
            user.changePassword(password, newPassword, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(result);
                }
            });
        });
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="login-field">
                    <label>Current password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="login-field">
                    <label>New password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                    />
                </div>
                <button type="submit" className="login-btn">
                    Change password
                </button>
            </form>
        </div>
    );
};

export default ChangePassword;
