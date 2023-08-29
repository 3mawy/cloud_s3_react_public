import {useState} from 'react';
import {useAuthentication} from "./useAuthentication.jsx";
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import {getObjectPresignedUrl, getObjects} from "../utils/remotes.js";

const useObjectsData = () => {
    const {refreshTokenAndRetry} = useAuthentication();
    const [loadingPresignedUrl, setLoadingPresignedUrl] = useState(false);
    const [errorPresignedUrl, setErrorPresignedUrl] = useState(null);
    const [objects, setObjects] = useState([]);
    const [loadingObjects, setLoadingObjects] = useState(false);
    const [errorObjects, setErrorObjects] = useState(null);
    const [currentPrefix, setCurrentPrefix] = useState('');
    const {currentCredentials, currentBucket} = useGlobalState();

    async function fetchObjectsPaginated(prefix, nextMarker) {

        return await refreshTokenAndRetry(async () => {
            return await getObjects(currentCredentials, currentBucket, prefix, nextMarker);
        })

    }

    async function fetchObjects(prefix) {
        if (currentBucket) {
            setErrorObjects(null);
            setLoadingObjects(true);
            try {
                const data = await fetchObjectsPaginated(prefix)
                setObjects(data);
                setCurrentPrefix(prefix);
            } catch (error) {
                setErrorObjects(error);
                console.error('Error fetching objects:', error);
            }
            setLoadingObjects(false);
        }

    }

    async function fetchMoreObjects() {
        try {
            const newData = await fetchObjectsPaginated(currentPrefix, objects.next_marker)
            setObjects({
                files: [...objects.files, ...newData.files],
                folders: [...objects.folders, ...newData.folders],
                marker: newData.marker,
                next_marker: newData.next_marker
            });

        } catch (error) {
            console.error('Error fetching objects:', error);
        }
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


    return {
        fetchObjectUrl,
        fetchObjects,
        fetchMoreObjects,
        loadingObjects,
        errorObjects,
        currentPrefix,
        setCurrentPrefix,
        loadingPresignedUrl,
        errorPresignedUrl,
        objects
    };

};

export default useObjectsData;