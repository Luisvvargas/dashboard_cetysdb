import NB from "../NavBar";
import Ingresos from "./IngresosEmpleados";

function IngresosApp(){
    return(
        <div className="flex">
            <NB></NB>
            <Ingresos></Ingresos>
        </div>
    )
}
export default IngresosApp;