import FolderIcon from "./Icons/FolderIcon.jsx";
import FileIcon from "./Icons/FileIcon.jsx";
import Modal from "./Modal.jsx";
import {useEffect, useState} from "react";
import useObjectsData from "../hooks/useObjectsData.jsx";
import DropdownArrow from "./Icons/dropdownArrow.jsx";
import FileViewer from "./FileViewer.jsx";
import Loader from "./Loaders/Loader.jsx";


// eslint-disable-next-line react/prop-types
const ObjectsExplorer = ({folders, files, currentPrefix, handlePrefixChange, nextMarker, onFetchMore}) => {
    const [modalToggle, setModalToggle] = useState();
    const [fileUrl, setFileUrl] = useState('');
    const [isImage, setIsImage] = useState(false);
    const {fetchObjectUrl, loadingPresignedUrl} = useObjectsData()
    useEffect(() => {
        console.log(nextMarker)
    }, [nextMarker]);
    function handleFileClick(file) {
        fetchObjectUrl(file).then(url => setFileUrl(url))
        setIsImage(isFileImage(file))
        setModalToggle(true)
    }

    function handleFolderClick(folder) {
        handlePrefixChange(folder)
    }

    const onModalClose = () => {
        setModalToggle(false)
        setFileUrl('')
    }
    const isFileImage = item => item.endsWith(".jpg") || item.endsWith(".png") || item.endsWith(".jpeg");
    return (
        <div>
            <Modal isOpen={modalToggle} onClose={onModalClose}>
                {loadingPresignedUrl ? (<Loader/>) : <FileViewer fileUrl={fileUrl} isImage={isImage}/>}
            </Modal>
            <div className="flex items-center mb-3 bg-bodydark1 p-2 dark:bg-meta-4 rounded min-w-[50rem]">
                <button
                    onClick={() => handlePrefixChange('')} // Handle going back to the root
                    className="text-blue-600 hover:underline cursor-pointer "
                >
                    Root
                </button>
                <span className="mx-2 ">/</span>
                {currentPrefix?.split('/').map((folder, index, foldersArray) => (
                    <div key={folder} className={'truncate'}>
                        {folder && <button
                            onClick={() => {
                                const newPrefix = foldersArray.slice(0, index + 1).join('/');
                                handlePrefixChange(`${newPrefix}/`);
                            }}
                            className="text-blue-600 hover:bg-primary hover:text-white p-1 font-bold rounded  cursor-pointer"
                        >
                            {folder}
                        </button>}
                        {index !== foldersArray.length - 1 && <span className="mx-2">/</span>}
                    </div>
                ))}
            </div>
            <div className="rounded-md min-w-[50rem]">
                <h2 className="text-lg font-semibold mb-2">Folders:</h2>
                <ul className=" mb-4">
                    {folders?.map((folder, index) => (
                        <li key={index} onClick={() => handleFolderClick(folder)}
                            className="text-body dark:text-whiten dark:bg-meta-4 bg-bodydark1 rounded my-1 dark:hover:text-white hover:text-white cursor-pointer flex gap-1.5 text-lg place-items-center ">
                            <span className={'bg-primary m-1 p-1 rounded'}><FolderIcon/></span>
                            <p>{folder}</p>
                        </li>
                    ))}
                </ul>
                <ul className="">
                    {files?.map((file, index) => (
                        <li key={file.file} onClick={() => handleFileClick(file.file)}
                            className="text-body dark:text-whiten dark:bg-meta-4 bg-bodydark1 rounded my-1 dark:hover:text-white hover:text-white cursor-pointer flex gap-1.5 text-lg place-items-center ">
                            <span className={'bg-primary m-1 p-1 rounded '}>
                                <FileIcon image={isFileImage(file.file)}/>
                            </span>
                            <span className={` justify-between flex w-full `}>
                                <p className="text-gray-800 truncate">{file.file}</p>
                                <p className="text-xs text-gray-600">
                                    Permissions: {file.grants[0].Permission}
                                </p>
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            {nextMarker !== '' && <div className={'rounded dark:bg-meta-4 bg-bodydark1 mt-2 flex place-items-center gap-3 px-2 hover:text-white cursor-pointer'} onClick={onFetchMore}>
                <DropdownArrow height={"38"} width={"30"} dropdownOpen={false}/>
                <span className={'text-xl font-bold '}>Load More</span>
            </div>
            }        </div>
    );
};

export default ObjectsExplorer;