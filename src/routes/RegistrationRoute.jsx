import {Navigate} from "react-router-dom";
import {useAuthentication} from "../hooks/useAuthentication.jsx";

export const RegistrationRoute = ({children}) => {

    const {isLoggedIn} = useAuthentication()
    if (isLoggedIn) {
        return <Navigate to="/"/>;
    }
    return children;
};