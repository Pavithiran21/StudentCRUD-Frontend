import {BrowserRouter,Route, Routes} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import { Signup } from './Components/Basics/signup';
import { Login } from './Components/Basics/login';
import { Forgot } from './Components/Basics/forgot';
import { Reset } from './Components/Basics/reset';
import { Activate } from './Components/Basics/Activate';
import { StudentTable } from './Components/Admin/StudentTable/StudentCRUD';
import { AddStudent } from './Components/Admin/StudentTable/AddStudent';
import { UpdateStudent } from './Components/Admin/StudentTable/EditStudent';
import {  AdminDashboard } from './Components/Admin/Dashboard/AdminDahboard';
import { ToastContainer } from 'react-toastify';
import { StudentDashboard } from './Components/Admin/StudentTable/StudentDashboard';
import { ViewStudent } from './Components/Admin/StudentTable/ViewStudent';
import { AdminView } from './Components/Admin/StudentTable/AdminView';











function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <ToastContainer />
       <Routes>
       
       <Route path="/" element={<Login/>}/>
          <Route  path='/signup' element={<Signup/>}/>
          <Route  path='/activate/:activetoken' element={< Activate/>}/>
          <Route  path='/forgot' element={<Forgot/>}/>
          <Route  path='/reset/:resetToken' element={<Reset/>}/>
          <Route  path='/admin-dashboard' element={<AdminDashboard/>}/>
          <Route  path='/student-dashboard' element={<StudentDashboard/>}/>
          <Route  path='/all-student/' element={<StudentTable/>}/>
          <Route  path='/add-student' element={<AddStudent/>}/>
          <Route  path='/update-student/:id' element={<UpdateStudent/>}/>
          <Route  path='/view-student/:id' element={<ViewStudent/>}/>
          <Route  path='/admin/view-student/:id' element={<AdminView/>}/>
          
        </Routes>
      </BrowserRouter>
      
      
      
    </div>
 
  );
}

export default App;
