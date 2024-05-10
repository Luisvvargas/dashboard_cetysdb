import DashboardMain from './Empleados/Admin/DashboardMain';
import LoginForm from './Login/LoginForm'
import Unumber from './Usuarios/unumber';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/Usuario' element={<Unumber/>}/>
        <Route path='/Empleado' element={<DashboardMain/>}/>
        {/* <Rounte path='/Admin' element={<DashboardAdmin/>}/> */}
      </Routes>
    </BrowserRouter>
    </div>

    /* Esta es la pagina de santiago, aqui vas a hacer el login que nos va a llevar a los componentes */ 
  )
}

export default App