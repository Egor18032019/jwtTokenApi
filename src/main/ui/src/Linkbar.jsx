import { AppRoute } from "./CONST.js"
import { Link } from "react-router-dom";

function Linkbar( ) {

    return (

        <div className="linkbar">

            <Link className="linkbar " to={AppRoute.AUTH}>
                <h2>- Авторизация </h2>
            </Link> 
            <Link className="linkbar " to={AppRoute.INFO}>
                <h2>- Информация</h2>
            </Link>
             <Link className={"linkbar "} to={AppRoute.LOGOUT}>
                <h2>- Выйти </h2>
            </Link>
 
        </div>


    );
}

export default Linkbar;