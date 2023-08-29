import {useState} from 'react';
import useCredentialsData from "../hooks/useCredentialsData.jsx";

const AddCredentialsForm = ({onClose}) => {
    const [identifier, setIdentifier] = useState('');
    const [awsAccessKeyId, setAwsAccessKeyId] = useState('');
    const [awsSecretAccessKey, setAwsSecretAccessKey] = useState('');
    const [awsDefaultRegion, setAwsDefaultRegion] = useState('');
    const [errors, setErrors] = useState({});
    const {addAWSCredentials} = useCredentialsData()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addAWSCredentials(identifier, awsAccessKeyId, awsSecretAccessKey, awsDefaultRegion)
            setIdentifier('');
            setAwsAccessKeyId('');
            setAwsSecretAccessKey('');
            setAwsDefaultRegion('');
            setErrors({});
            onClose();
        } catch (error) {
            setErrors(await error.data)
        }
    };
    return (
        <>
            <p className="mb-9 font-bold text-black dark:text-white text-title-md ">
                Add New Credentials
            </p>

            <form onSubmit={handleSubmit } className={`w-full`}>
                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        Credentials Identifier
                    </label>
                    <input
                        type="text"
                        placeholder="Enter a unique identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.identifier && (
                        <p className="text-danger mt-1">{errors.identifier}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        AWS Access Key ID
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your AWS Access Key ID"
                        value={awsAccessKeyId}
                        onChange={(e) => setAwsAccessKeyId(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.aws_access_key_id && (
                        <p className="text-danger mt-1">{errors.aws_access_key_id}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        AWS Secret Access Key
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your AWS Secret Access Key"
                        value={awsSecretAccessKey}
                        onChange={(e) => setAwsSecretAccessKey(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.aws_secret_access_key && (
                        <p className="text-danger mt-1">{errors.aws_secret_access_key}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="mb-2.5 block font-medium text-black dark:text-white">
                        AWS Default Region
                    </label>
                    <input
                        type="text"
                        placeholder="Enter your AWS Default Region"
                        value={awsDefaultRegion}
                        onChange={(e) => setAwsDefaultRegion(e.target.value)}
                        className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                    {errors.region_name && (
                        <p className="text-danger mt-1">{errors.region_name}</p>
                    )}
                    {errors.error && (
                        <p className="text-danger mt-1">{errors.error}</p>
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full mt-2 cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                >
                    Submit
                </button>
            </form>
        </>
    );
};

export default AddCredentialsForm;