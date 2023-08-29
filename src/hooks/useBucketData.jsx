import {useAuthentication} from "./useAuthentication.jsx";
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import {getBuckets} from "../utils/remotes.js";

const useBucketData = () => {
    const {refreshTokenAndRetry} = useAuthentication();
    const {currentCredentials, setBuckets, setErrorBuckets, setLoadingBuckets} = useGlobalState();


    async function fetchBuckets() {
        if (currentCredentials) {
            setLoadingBuckets(true);
            setErrorBuckets(null);
            const data = await refreshTokenAndRetry(async () => {
                return await getBuckets(currentCredentials);
            })
            if (data.status!==500) {
                setBuckets(data);
            } else {
                setErrorBuckets(data.error);
            }
            setLoadingBuckets(false);
        }
    }



    return {fetchBuckets};
};

export default useBucketData;
