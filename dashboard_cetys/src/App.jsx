// import NavBar from './navbar'
import Iniciocont from './components/iniciocont';
import InicioWelcome from './components/iniciowelcome';
import LoginForm from './components/LoginForm'
import NavBar from './components/navbar';
import Unumber from './components/unumber';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginForm/>}/>
        <Route path='/Usuario' element={<Unumber/>}/>
        {/* <Route path='/Empleado' element={<NavBar/>}/> */}
        <Route path='/Empleado' element={<Iniciocont/>}/>
        <Route path='/Empleado' element={<InicioWelcome/>}/>
        {/* <Route path='/Admin' element={<Unumber/>}/> */}
      </Routes>
    </BrowserRouter>
    </div>

    /* Esta es la pagina de santiago, aqui vas a hacer el login que nos va a llevar a los componentes */ 
  )
}

export default App