import Loader from "./Loader.jsx";
import {useGlobalState} from "../../context/GlobalStateContext.jsx";
import {useEffect} from "react";

import UseCredentialsData from "../../hooks/useCredentialsData.jsx";

const CredentialsLoader = ({className}) => {
    const {loadingCredentialsArr, errorCredentialsArr, credentialsArr, currentCredentials} = useGlobalState();
    const {fetchAWSCredentials} = UseCredentialsData();
    useEffect(() => {
        fetchAWSCredentials();
    }, [currentCredentials]);

    return (
        <div>
            {loadingCredentialsArr && (
                <div className={`${className} absolute inset-0 flex justify-center`}>
                    <Loader/>
                </div>
            )}
            {(errorCredentialsArr && credentialsArr?.length === 0) && <div
                className={`${className} text-danger absolute inset-0 flex justify-center text-center place-items-center`}>
                <p>No Credentials yet</p></div>}
        </div>
    );
};

export default CredentialsLoader;
