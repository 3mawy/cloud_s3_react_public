import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ObjectsExplorer from "../components/ObjectsExplorer.jsx";
import TableHeadingFilters from "../components/Filter/TableHeadingFilters.jsx";
import useObjectsData from "../hooks/useObjectsData.jsx";
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import ObjectsLoader from "../components/Loaders/ObjectsLoader.jsx";


const BucketDetails = () => {
    const {bucketName} = useParams();
    const [filteredObjects, setFilteredObjects] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('');
    const {setCurrentBucket, currentBucket} = useGlobalState('');

    useEffect(() => {
        setCurrentBucket(bucketName);
    }, [bucketName]);
    const setFiltered = (filteredItems, currentFilter) => {
        setFilteredObjects(filteredItems)
        setCurrentFilter(currentFilter)
    }
    const {
        objects,
        currentPrefix,
        setCurrentPrefix,
        fetchObjects,
        fetchMoreObjects,
        loadingObjects,
        errorObjects
    } = useObjectsData()

    useEffect(() => {
        fetchObjects(currentPrefix);
    }, [currentBucket, currentPrefix]);

    return (
        objects &&
        <div
            className="rounded-sm min-h-[40rem] relative border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-x-scroll">
            <div className={'sticky left-0'}>
                <h1 className={'text-2xl pb-5'}>Bucket Details: {bucketName}</h1>
                <TableHeadingFilters items={objects.files} onFilter={setFiltered} heading={`Objects`}/>
            </div>
            <ObjectsLoader loadingObjects={loadingObjects} errorObjects={errorObjects} >
                <ObjectsExplorer folders={objects.folders} files={currentFilter ? (filteredObjects) : (objects.files)}
                                 currentPrefix={currentPrefix}
                                 handlePrefixChange={setCurrentPrefix}
                                 nextMarker={objects.next_marker}
                                 onFetchMore={fetchMoreObjects}/>
            </ObjectsLoader>
        </div>
    );
};

export default BucketDetails;
