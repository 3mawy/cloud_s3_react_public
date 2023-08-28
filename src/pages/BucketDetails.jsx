import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ObjectsExplorer from "../components/ObjectsExplorer.jsx";
import TableHeadingFilters from "../components/Filter/TableHeadingFilters.jsx";
import useObjectsData from "../hooks/useObjectsData.jsx";
import {useGlobalState} from "../context/GlobalStateContext.jsx";

const BucketDetails = () => {
    const {bucketName} = useParams();
    const [objects, setObjects] = useState([]);
    const [filteredObjects, setFilteredObjects] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('');
    const [currentPrefix, setCurrentPrefix] = useState('');
    const {setCurrentBucket, currentBucket} = useGlobalState('');

    const {fetchObjectsPaginated} = useObjectsData()
    const setFiltered = (filteredItems, currentFilter) => {
        setFilteredObjects(filteredItems)
        setCurrentFilter(currentFilter)
    }
    useEffect(() => {
        setCurrentBucket(bucketName);
    }, [bucketName]);


    async function fetchObjects(prefix) {
        if (currentBucket) {
            try {
                const data = await fetchObjectsPaginated(prefix)
                setObjects(data);
                setCurrentPrefix(prefix);
            } catch (error) {
                console.error('Error fetching objects:', error);
            }
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

    useEffect(() => {
        fetchObjects(currentPrefix);
    }, [currentBucket, currentPrefix]);
    const handlePrefixChange = (prefix) => {
        setCurrentPrefix(prefix)
    };


    return (
        objects &&
        <div
            className="rounded-sm min-h-[40rem] relative border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-x-scroll">
            <div className={'sticky left-0'}>
                <h1 className={'text-2xl pb-5'}>Bucket Details: {bucketName}</h1>
                <TableHeadingFilters items={objects.files} onFilter={setFiltered}/>
            </div>
            <ObjectsExplorer folders={objects.folders} files={currentFilter ? (filteredObjects) : (objects.files)}
                             currentPrefix={currentPrefix}
                             handlePrefixChange={handlePrefixChange}
                             nextMarker={objects.next_marker}
                             onFetchMore={fetchMoreObjects}/>
        </div>
    );
};

export default BucketDetails;
