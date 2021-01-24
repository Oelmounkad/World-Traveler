import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Community from './components/Community';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthState from './context/auth/AuthState'
import Header from './components/Header';

const App = () => {
  return (

    <AuthState>
        <Router>
          <Header />
              <Switch>
                        {/* Auth */}
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />


                      <Route exact path="/community" component={Community} />


              </Switch>
        </Router>
    </AuthState>
  );
}

export default App;
