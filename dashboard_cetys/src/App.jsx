import LoginForm from './Login/LoginForm'
import Unumber from './Usuarios/unumber';
import NavBar from './Empleados/navbar';
import DashboardMain from './Empleados/DashboardMain';
import DashboardMainAdmin from './Administradores/DashboardAdminMain';
import Ingresos from './Apartados/Ingresos';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/Usuario' element={<Unumber/>}/>
        <Route path='/Empleado' element={<DashboardMain/>}/>
        <Route path='/Admin' element={<DashboardMainAdmin/>}/>
        <Route path='/NavBar' element={<NavBar/>}/> 
        <Route path='/Ingresos' element={<Ingresos/>}/>
      </Routes>
    </BrowserRouter>
    </div>


  )
}

export default App