import {Navigate} from "react-router-dom";
import {useAuthentication} from "../hooks/useAuthentication";

export const ProtectedRoute = ({children}) => {

    const {isLoggedIn} = useAuthentication()
    if (!isLoggedIn) {
        return <Navigate to="/auth/signin"/>;
    }
    return children;
};