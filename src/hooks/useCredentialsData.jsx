import {useGlobalState} from "../context/GlobalStateContext.jsx";
import {useAuthentication} from "./useAuthentication.jsx";
import {addCredentials, getCredentials} from "../utils/remotes.js";

const UseCredentialsData = () => {
    const {
        setCredentialsArr,
        setLoadingCredentialsArr,
        setErrorCredentialsArr,
    } = useGlobalState()

    const {refreshTokenAndRetry} = useAuthentication()
    const addAWSCredentials = async (identifier, awsAccessKeyId, awsSecretAccessKey, awsDefaultRegion) => {
        const result = await refreshTokenAndRetry(async () => {
            return await addCredentials(identifier, awsAccessKeyId, awsSecretAccessKey, awsDefaultRegion);
        })
        if (result.status === 201) {
            return await fetchAWSCredentials()
        } else
            throw result;
    }

    async function fetchAWSCredentials() {
        setLoadingCredentialsArr(true);
        setErrorCredentialsArr(null);

        try {
            const data = await refreshTokenAndRetry(async () => {
                return getCredentials();
            })
            setCredentialsArr(data)

        } catch (error) {
            setErrorCredentialsArr(error)
            console.error('Error fetching Credentials:', error);
        }
        setLoadingCredentialsArr(false);
    }


    return {fetchAWSCredentials, addAWSCredentials};

};

export default UseCredentialsData;