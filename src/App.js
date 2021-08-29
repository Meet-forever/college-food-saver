import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup.js'
import List from './components/List.js'
import Profile from './components/Profile';
import NoPathMatch from './components/NoPathMatch'

const ProtectedRoute = (props) => {
  return(
        <Route path={props.path} render={data => localStorage.getItem('auth_id') === null || localStorage.getItem('auth_id') === "NOACTIVEUSER" ? 
        (<Redirect to={{pathname:'/login'}}></Redirect>):
        (<props.component {...data}></props.component>)}></Route>
    )
}

const LoginSignUpRollBackRoute = (props) => {
  return(
        <Route path={props.path} render={data => localStorage.getItem('auth_id') === null || localStorage.getItem('auth_id') === "NOACTIVEUSER" ? 
        (<props.component {...data}></props.component>):
        (<Redirect to={{pathname: '/listing'}}></Redirect>)}></Route>
    )
}

function App() {
  return (
    <div className="App">
        <Switch>
          <LoginSignUpRollBackRoute exact path="/login" component={Login} />
          <LoginSignUpRollBackRoute exact path="/signup" component={Signup} />
          <ProtectedRoute exact path="/listing" component={List} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <Route component={NoPathMatch}/>
        </Switch>
    </div>
  );
}

export default App;
