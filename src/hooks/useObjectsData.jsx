import {useState} from 'react';
import {useAuthentication} from "./useAuthentication.jsx";
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import {getObjectPresignedUrl, getObjects} from "../utils/remotes.js";

const useObjectsData = () => {
    const {refreshTokenAndRetry} = useAuthentication();
    const [loadingPresignedUrl, setLoadingPresignedUrl] = useState(false);
    const [errorPresignedUrl, setErrorPresignedUrl] = useState(null);
    const {currentCredentials, currentBucket} = useGlobalState();

    async function fetchObjectsPaginated(prefix, nextMarker) {

        return  await refreshTokenAndRetry(async () => {
            return await getObjects(currentCredentials, currentBucket, prefix, nextMarker);
        })

    }

    async function fetchObjectUrl(object_key) {
        setLoadingPresignedUrl(true);
        setErrorPresignedUrl(null);
        try {
            const data = await refreshTokenAndRetry(async () => {
                return await getObjectPresignedUrl(currentCredentials, currentBucket, object_key);
            })
            setLoadingPresignedUrl(false);
            return data.presigned_url
        } catch (error) {
            setErrorPresignedUrl(error);
        }
    }


    return {fetchObjectUrl, fetchObjectsPaginated, loadingPresignedUrl, errorPresignedUrl};

};

export default useObjectsData;