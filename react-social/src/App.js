import { useContext } from 'react';
import Home from './pages/home/Home'
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {Route,Link,Routes,Navigate} from  "react-router-dom"
import { BrowserRouter  as Router} from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

function App() {

  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user? <Home/> : <Register/>}/>
        <Route path="/login" element={user ? <Navigate to="/"/>:<Login/>}/>
        <Route path="/register" element={user ? <Navigate to="/"/> :<Register/>}/>
        <Route path="/profile/:username" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
