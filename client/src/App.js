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
import Meetings from './components/Meetings';
import HomePage from './components/HomePage';

const App = () => {
  return (
<AppState>
    <AuthState>
      
        <Router>
          <Header />
              <Switch>

                      <Route exact path="/" component={HomePage} />
                        {/* Auth */}
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/signup" component={Signup} />

                      <Route exact path="/community" component={Community} />
                      <Route exact path="/community/:chosenCity" component={Community} />
                      <Route exact path="/recommandations" component={Recommandations} />
                      <Route exact path="/recommandations/:chosenCity" component={Recommandations} />
                      <Route exact path="/questions" component={Questions} />
                      <Route exact path="/profile/add" component={AddProfile} />
                      <Route exact path="/profile/:id" component={Profile} />
                      
                      <Route exact path="/meetings" component={Meetings} />


              </Switch>
        </Router>
       
    </AuthState>
       </AppState>
  );
}

export default App;
