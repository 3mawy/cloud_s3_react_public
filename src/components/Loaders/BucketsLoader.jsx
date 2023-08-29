import Loader from "./Loader.jsx";
import {useGlobalState} from "../../context/GlobalStateContext.jsx";
import {useEffect} from "react";
import useBucketData from "../../hooks/useBucketData.jsx";

const BucketsLoader = ({className}) => {
    const {loadingBuckets, errorBuckets, buckets} = useGlobalState();
    const {fetchBuckets} = useBucketData();

    useEffect(() => {
        fetchBuckets();
    }, []);
    return (
        <div>
            {loadingBuckets && (
                <div className={`${className} absolute inset-0 flex justify-center`}>
                    <Loader/>
                </div>
            )}
            {(errorBuckets && buckets.length===0) && <div className={`${className} text-danger absolute inset-0 flex justify-center text-center place-items-center`}>
                <p>Something went wrong please check your credentials or refresh</p></div>}
        </div>
    );
};

export default BucketsLoader;
