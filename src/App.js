import './App.css';
import Login from './components/auth/Login'
import { Route, Switch, Link } from 'react-router-dom'
import Home from './components/Home.js'
import Signup from './components/auth/Signup.js'
import List from './components/List.js'
import Add from './components/Add.js'
import Delete from './components/Delete.js'
import { AuthProvider } from "./context/AuthContext"

const App = () => {
  return (
    <div className="App">
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/list" component={List}/>
        <Route exact path="/add" component={Add}/>
        <Route exact path="/delete/:id" component={Delete}/>
      </Switch>
    </AuthProvider>
    </div>
  );
}

export default App;
