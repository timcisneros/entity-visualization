import { Account } from './components/Cognito/Account';
import Status from './components/Cognito/Status';
// import Pool from './UserPool';

// const user = Pool.getCurrentUser();

const App = () => {
  return (
    <Account>
      <Status />
    </Account>
  );
};

export default App;
