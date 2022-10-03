import { useRef, useState, useContext, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { ReactFlowProvider } from 'react-flow-renderer';
import { Chart } from '../Chart';
import { AccountContext } from './Account';
import Login from './Login';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const Status = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [status, setStatus] = useState(false);

  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        // console.log('Session: ', session);
        setStatus(true);
      })
      .catch((e) => e);
  }, [getSession]);

  const options = {
    title: 'Logout',
    message: 'Are you sure you want to logout?',
    buttons: [
      {
        label: 'Yes',
        onClick: () => logout(),
      },
      {
        label: 'No',
        onClick: () => null,
      },
    ],
  };

  return (
    <div>
      {status ? (
        <>
          <button className="logout" onClick={() => confirmAlert(options)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="logout__icon"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
              />
            </svg>
          </button>

          <ReactFlowProvider>
            <Chart ref={componentRef} handlePrint={handlePrint} />
          </ReactFlowProvider>
        </>
      ) : (
        <div className="login-container">
          <div className="login">
            <h1>Login</h1>
            <Login />
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
