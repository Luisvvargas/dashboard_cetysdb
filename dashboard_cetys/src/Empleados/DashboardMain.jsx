import InicioWelcome from "./iniciowelcome";
import Iniciocont from "./iniciocont";
import NavBar from "./navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function DashboardMain(){
    return(
        <div>
            <NavBar></NavBar>
            <Iniciocont></Iniciocont>
            <InicioWelcome></InicioWelcome>
        </div>
    )
}
export default DashboardMain