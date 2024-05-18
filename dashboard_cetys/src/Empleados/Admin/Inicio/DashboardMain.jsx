import NavBar from "../navbar";
import Iniciocont from "./iniciocont";
import InicioWelcome from "./iniciowelcome";

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