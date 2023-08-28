import useDropdown from "../hooks/UI/useDropdown.jsx";
import KeyIcon from "./Icons/KeyIcon.jsx";
import PlusIcon from "./Icons/PlusIcon.jsx";
import {useState} from "react";
import Modal from "./Modal.jsx";
import {useGlobalState} from "../context/GlobalStateContext.jsx";
import {useNavigate} from "react-router-dom";
import CredentialsLoader from "./Loaders/CredentialsLoader.jsx";
import AddCredentialsForm from "./AddCredentialsForm.jsx";

const DropdownCredentials = () => {
    const [modalToggle, setModalToggle] = useState(false);
    const {dropdownOpen, setDropdownOpen, triggerRef, dropdownRef} = useDropdown();
    const {setCurrentCredentials, credentialsArr} = useGlobalState()
    const navigate = useNavigate();


    const handleCredChange = (credentialIdentifier) => {
        setDropdownOpen(false)
        setCurrentCredentials(credentialIdentifier)
        navigate('/')
    }

    return (
        <li className="relative">

            <a
                ref={triggerRef}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
            >
                <KeyIcon/>
            </a>
            <Modal isOpen={modalToggle} onClose={() => setModalToggle(false)} >
                <AddCredentialsForm onClose={() => setModalToggle(false)}/>
            </Modal>
            {/* <!-- Dropdown Start --> */}
            <div
                ref={dropdownRef}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute -right-28 mt-2.5 flex h-90 min-w-75 md:w-auto flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
                    dropdownOpen === true ? 'block' : 'hidden'
                }`}
            >
                <CredentialsLoader/>
                <div className="px-4.5 py-3 flex justify-between place-items-center">
                    <h5 className="text-sm font-medium text-bodydark2">AWS Credentials</h5>
                    <div onClick={() => setModalToggle(true)}
                         className="text-sm font-medium text-black dark:text-white bg-meta-3 rounded p-1">
                        <PlusIcon/>
                    </div>
                </div>
                <ul className="flex h-auto flex-col overflow-y-auto ">
                    {credentialsArr?.map((credential, index) => (
                        <li key={credential.identifier}>
                            <div onClick={() => handleCredChange(credential.identifier)}
                                 className="relative flex justify-between cursor-pointer gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4">
                                <div>
                                    {/* Display AWS credential information */}
                                    <h6 className="text-sm font-medium text-black dark:text-white">
                                        {credential.identifier}
                                    </h6>
                                    <p className="text-sm">{credential.region_name}</p>
                                    <p className="text-sm">{credential.aws_access_key_id}</p>
                                    <p className="text-sm">{credential.aws_secret_access_key}</p>
                                </div>
                                <div
                                    className="text-sm h-fit absolute top-1/2 bottom-1/2 right-3 text-black my-auto dark:text-white bg-meta-2 dark:bg-meta-4 rounded-full p-2">
                                    <KeyIcon/>
                                </div>
                            </div>
                        </li>
                    ))}

                </ul>
            </div>
            {/* <!-- Dropdown End --> */}
        </li>
    );
};

export default DropdownCredentials;
