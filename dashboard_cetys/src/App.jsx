import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReportesApp from './Empleados/ReportesApp';
import NB from './NavBar';

import DashboardMainAdmin from './Administradores/DashboardAdminMain'; //MAIN ADMIN
import DashboardMain from './Empleados/DashboardMain'; //MAIN EMPLEADO

import LoginForm from './Login/LoginForm'; //MAIN LOGIN opc
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
        <Route path='/Reportes' element={<ReportesApp/>}/>
        <Route path='/NavBar' element={<NB/>}/>
      </Routes>
    </BrowserRouter>
    </div>


  )
}

export default App