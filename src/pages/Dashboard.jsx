import BucketsTable from '../components/Dashboard/BucketsTable.jsx';
import Card from "../components/Dashboard/Card.jsx";
import KeyIcon from "../components/Icons/KeyIcon.jsx";
import BucketIcon from "../components/Icons/BucketIcon.jsx";
import ObjectsIcon from "../components/Icons/ObjectsIcon.jsx";
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import AwsCredDashCard from "../components/Dashboard/AwsCredentials/AwsCredDashCard";
import {filterPublic} from "../utils/filterHelpers.js";
import FolderIcon from "../components/Icons/FolderIcon.jsx";
import {useEffect, useState} from "react";
import {getObjectStats, getTaskStatus} from "../utils/remotes.js";

const Dashboard = () => {
    const {credentialsArr, buckets, currentCredentials} = useGlobalState()
    const [objectStats, setObjectStats] = useState({});
    const [taskId, setTaskId] = useState({});
    const [taskStatus, setTaskStatus] = useState({});
    useEffect(() => {
        async function fetchTaskId() {
            try {
                const result = await getObjectStats(currentCredentials);
                setTaskId(result);
            } catch (error) {
                console.error('Error fetching object stats:', error);
            }
        }

        fetchTaskId();
    }, []);

    useEffect(() => {
        async function fetchTaskStatus(taskId) {
            try {
                const result = await getTaskStatus(taskId);
                setTaskStatus(result.status);
            } catch (error) {
                // Handle errors here
                console.error('Error fetching task status:', error);
            }
        }

        fetchTaskStatus(taskId); // Include taskId here
    }, [taskId]); // Add taskId to the dependency array
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <Card Icon={BucketIcon} text={'Buckets'} num={buckets?.length}
                      secNum={filterPublic(buckets)?.length}/>
                <Card Icon={ObjectsIcon} text={'Objects'} num={435} secNum={1}/>
                <Card Icon={FolderIcon} text={'Objects Size'} num={435} />
                <Card Icon={KeyIcon} text={'Credentials'} num={credentialsArr?.length}/>
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
