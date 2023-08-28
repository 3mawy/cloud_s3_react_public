import BucketsTable from '../components/Dashboard/BucketsTable.jsx';
import Card from "../components/Dashboard/Card.jsx";
import KeyIcon from "../components/Icons/KeyIcon.jsx";
import BucketIcon from "../components/Icons/BucketIcon.jsx";
import ObjectsIcon from "../components/Icons/ObjectsIcon.jsx";
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import AwsCredDashCard from "../components/Dashboard/AwsCredentials/AwsCredDashCard";
import {filterPublic} from "../utils/filterHelpers.js";

const Dashboard = () => {
    const {credentialsArr, buckets} = useGlobalState()
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <Card Icon={BucketIcon} text={'Buckets'} num={buckets?.length}
                      secNum={filterPublic(buckets)?.length}/>
                <Card Icon={ObjectsIcon} text={'Objects'} num={435} secNum={1}/>
                <Card Icon={KeyIcon} text={'Credentials'} num={credentialsArr?.length}/>
                <Card/>
            </div>
            <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">

                <div className="col-span-12 xl:col-span-8">
                    <BucketsTable/>
                </div>
                <AwsCredDashCard/>
            </div>
        </>
    );
};

export default Dashboard;
