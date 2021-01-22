import {BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  return (
    
    <Router>
          <Switch>

                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />

          </Switch>
    </Router>
  );
}

export default App;
