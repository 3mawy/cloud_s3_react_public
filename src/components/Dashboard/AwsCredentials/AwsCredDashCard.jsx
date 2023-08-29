import AwsCredDashCardItem from "./AwsCredDashCardItem.jsx";
import {useGlobalState} from "../../../context/GlobalStateContext.jsx";
import CredentialsLoader from "../../Loaders/CredentialsLoader.jsx";

const AwsCredDashCard = () => {
    const {credentialsArr} = useGlobalState()
    return credentialsArr && (
        <div
            className="col-span-12 relative rounded-sm border border-stroke bg-white pb-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4 max-h-[50rem] overflow-auto">
            <h4 className=" px-7.5 py-5 text-xl font-semibold text-black dark:text-white sticky top-0 bg-white dark:bg-boxdark">
                Credentials
            </h4>

            <div>
                <CredentialsLoader/>
                {credentialsArr?.map((credentials) => <AwsCredDashCardItem key={credentials.identifier} credential={credentials}/>)}
            </div>
        </div>
    );
};

export default AwsCredDashCard;
