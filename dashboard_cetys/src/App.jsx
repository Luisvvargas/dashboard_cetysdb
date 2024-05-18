import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardMainAdmin from './Administradores/DashboardAdminMain';
import DashboardMain from './Empleados/DashboardMain';
import LoginForm from './Login/LoginForm';
import Unumber from './Usuarios/unumber';
import Welcome from './Usuarios/welcome';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/Usuario' element={<Unumber/>}/>
        <Route path='/Empleado' element={<DashboardMain/>}/>
        <Route path='/Admin' element={<DashboardMainAdmin/>}/>
        <Route path='/welcome' element={<Welcome/>}/>

      </Routes>
    </BrowserRouter>
    </div>


  )
}

export default App