import { BrowserRouter, Route, Routes } from 'react-router-dom';


import DashboardMainAdmin from './Administradores/DashboardAdminMain'; //MAIN ADMIN
import DashboardMain from './Empleados/DashboardMain'; //MAIN EMPLEADO

import IngresosApp from './Empleados/IngresosApp';
import ReportesApp from './Empleados/ReportesApp';
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
        <Route path='/reportes' element={<ReportesApp/>}/>
        <Route path='/ingresos' element={<IngresosApp/>}/>
        

      </Routes>
    </BrowserRouter>
    </div>


  )
}

export default App