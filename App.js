import logo from './logo.svg';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import MeetPage from './pages/MeetPage.jsx';
import LoginProtector from './protectedRoutes/LoginProtector.jsx';
import RouteProtector from './protctedRoutes/RouteProtector.jsx';
function App() {
  return (
    <div className="App">
      

       <Routes>

         <Route path='/login' element={<LoginProtector><Login/></LoginProtector>} />
         <Route path='/register' element={<LoginProtector><Register/></LoginProtector>} />
         <Route path = '/meet/:id' element ={<LoginProtector><MeetPage/></LoginProtector>} />
       
       </Routes>
    </div>
  );
}

export default App;
