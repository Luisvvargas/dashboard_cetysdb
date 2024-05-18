import Iniciocont from "./iniciocont";
import InicioWelcome from "./iniciowelcome";
import NavBar from "./navbar";


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