import logo from './logo.svg';
import './App.css';
import Signup from './Components/UserComponents/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ManageCenters from './Components/AdminComponents/ManageCenters'
import SubmitRequest from './Components/UserComponents/SubmitRequest';
import AdminDash from './Components/AdminComponents/AdminDash';
import CenterDash from './Components/Center/CenterDash';
import UserDash from './Components/UserComponents/UserDash';

import AddCenter from './Components/Center/AddCenter';
import ApproveRequest from './Components/Center/ApproveRequest';
import UserHome from './Components/UserComponents/UserHome';
import UserHistory from './Components/UserComponents/UserHistory';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/admindash' element={<AdminDash/>}></Route>
        <Route path='/centerdash' element={<CenterDash/>}></Route>
        <Route path='/userdash' element={<UserDash/>}></Route>
        <Route path='/submit' element={<SubmitRequest />}></Route>
     <Route path ='/approveStatus' element={<ApproveRequest/>}></Route>
        <Route path='/addCenters' element={<AddCenter/>}></Route>
        <Route path='/manageCenters' element={<ManageCenters/>}></Route>
        <Route path='/home' element={<UserHome/>}></Route>
        <Route path='/userHistory'element={<UserHistory/>}></Route>
  
      </Routes>
      </BrowserRouter> 
     
    </div>
  );
}

export default App;
