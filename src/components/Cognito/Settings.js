import { useEffect, useContext, useState } from 'react';
import { AccountContext } from './Account';
import ChangeEmail from './ChangeEmail';
import ChangePassword from './ChangePassword';

const Settings = () => {
  const { getSession } = useContext(AccountContext);

  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    getSession()
      .then(() => {
        setLoggedIn(true);
      })
      .catch((e) => e);
  }, [getSession]);

  return (
    <div>
      {loggedin && (
        <>
          <h2>Settings</h2>
          <ChangePassword />
          <ChangeEmail />
        </>
      )}
    </div>
  );
};

export default Settings;
