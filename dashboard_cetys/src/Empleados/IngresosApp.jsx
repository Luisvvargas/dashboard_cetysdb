import NB from "../NavBar";
import Ingresos from "./Ingresos";

function IngresosApp(){
    return(
        <div className="flex">
            <NB></NB>
            <Ingresos></Ingresos>
        </div>
    )
}
export default IngresosApp;