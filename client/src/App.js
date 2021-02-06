import './App.css';
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Community from './components/Community';
import Login from './components/Login';
import Signup from './components/Signup';
import AuthState from './context/auth/AuthState'
import Header from './components/Header';
import Profile from './components/Profile';
import AppState from './context/app/AppState';
import AddProfile from './components/AddProfile';
import Recommandations from './components/Recommandations';
import Questions from './components/Questions';

const App = () => {
  return (
<AppState>
    <AuthState>
      
        <Router>
          <Header />
              <Switch>
                        {/* Auth */}
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />


                      <Route exact path="/community" component={Community} />
                      <Route exact path="/recommandations" component={Recommandations} />
                      <Route exact path="/questions" component={Questions} />
                      <Route exact path="/profile/add" component={AddProfile} />
                      <Route exact path="/profile/:id" component={Profile} />
                      


              </Switch>
        </Router>
       
    </AuthState>
       </AppState>
  );
}

export default App;
