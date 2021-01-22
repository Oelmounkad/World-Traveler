import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import AuthState from './context/auth/AuthState'
const App = () => {
  return (
    <AuthState>
        <Router>
              <Switch>

                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />

              </Switch>
        </Router>
    </AuthState>
  );
}

export default App;
