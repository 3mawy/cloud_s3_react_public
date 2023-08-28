import {useGlobalState} from "../../../context/GlobalStateContext.jsx";

const AwsCredDashCardItem = ({credential}) => {
    const {setCurrentCredentials, currentCredentials} = useGlobalState()

    const handleCredChange = (credentialIdentifier) => {
        setCurrentCredentials(credentialIdentifier)
    }

    return (
        <div
            onClick={() =>handleCredChange(credential.identifier)}
            className={`flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3  dark:hover:bg-meta-4
            ${(credential.identifier === currentCredentials)? 'bg-meta-4':''}`}
        >
            <div className="flex flex-1 items-center justify-between w-full"
                 onClick={() => setCurrentCredentials(credential.identifier)}>
                <div>
                    <div className={'flex justify-between'}>

                        <h5 className="font-medium text-black dark:text-white">
                            {credential.identifier}
                        </h5>
                        <div className="text-xs truncate">{credential.region_name} </div>
                    </div>
                    <div className={`flex items-center gap-4`}>
                        <div className="text-sm text-black dark:text-white ">
                            <p className="text-sm truncate">{credential.aws_access_key_id}</p>
                            <p className="text-sm truncate">{credential.aws_secret_access_key}</p>
                        </div>

                    </div>

                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-danger">
                    <span className="text-sm font-medium text-white">X</span>
                </div>
            </div>
        </div>
    );
};

export default AwsCredDashCardItem;