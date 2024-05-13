import InicioWelcomeAdmin from "./iniciowelcomeAdmin";
import IniciocontAdmin from "./iniciocontAdmin";
import NavBarAdmin from "./navbarAdmin";


function DashboardMainAdmin(){
    return(
        <div>
            <NavBarAdmin></NavBarAdmin>
            <IniciocontAdmin></IniciocontAdmin>
            <InicioWelcomeAdmin></InicioWelcomeAdmin>
        </div>
    )
}
export default DashboardMainAdmin