import TableHeadingFilters from "../Filter/TableHeadingFilters.jsx";
import {useGlobalState} from "../../context/GlobalStateContext.jsx";
import BucketsLoader from "../Loaders/BucketsLoader.jsx";
import {useEffect, useState} from "react";
import {isPublic} from "../../utils/filterHelpers.js";
import useBucketDataLoader from "../../hooks/useBucketDataLoader.jsx";

const BucketsTable = () => {
    const {buckets, currentCredentials, setBuckets} = useGlobalState();
    const [filteredBuckets, setFilteredBuckets] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('');
    const {fetchBuckets} = useBucketDataLoader()

    const setFiltered = (filteredItems, currentFilter) => {
        setFilteredBuckets(filteredItems)
        setCurrentFilter(currentFilter)
    }

    useEffect(() => {
        // setBuckets([]);
        setFilteredBuckets([])
        fetchBuckets();
    }, [currentCredentials]);
    const tableHeaders = [
        {
            label: 'Bucket Name',
            key: 'bucket_name',
        },
        {
            label: 'Grantee Type',
            key: 'grants',
            render: (value) => (
                <ul>
                    {value?.map((grant, index) => (
                        <li key={index}>{grant.Grantee.Type}</li>
                    ))}
                </ul>
            ),
        },
        {
            label: 'Permission',
            key: 'grants',
            render: (value) => (
                <ul>
                    {value?.map((grant, index) => (
                        <li key={index}>{grant.Permission}</li>
                    ))}
                </ul>
            ),
        },
        {
            label: 'Public',
            key: 'grants',
            render: (value) => (
                <p>{isPublic(value) ? (<span className={'bg-meta-3 p-2 rounded'}>public</span>) : (
                    <span className={'bg-danger p-2 rounded text-center'}>not public</span>)}</p>
            ),
        },
    ];
    return (
        <div
            className="rounded-sm min-h-[40rem] relative border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 overflow-x-scroll">
            <div className={'sticky left-0'}>
                <TableHeadingFilters items={buckets} onFilter={setFiltered}/>
            </div>
            <table className="w-full table-auto ">
                <thead>
                <tr className="bg-gray-2 rounded text-left dark:bg-meta-4">

                    {tableHeaders?.map((header, index) => (
                        <th
                            key={index}
                            className="py-4 px-4 font-bold text-black dark:text-white"
                        >
                            {header.label}
                        </th>
                    ))}

                </tr>
                </thead>
                <tbody>
                {buckets.length>0 && (currentFilter ? (filteredBuckets) : (buckets)).map((bucket, index) => (
                    <tr key={index}>
                        {tableHeaders?.map((header, idx) => (
                            <td
                                key={idx}
                                className="border-b border-[#eee] py-5 px-4 dark:border-strokedark"
                            >
                                <div className={'text-black dark:text-white'}>
                                    {header.render
                                        ? header.render(bucket[header.key])
                                        : bucket[header.key]}
                                </div>
                            </td>
                        ))}
                    </tr>
                ))}

                </tbody>
            </table>
            <BucketsLoader/>
        </div>
    );
};

export default BucketsTable;