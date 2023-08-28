const FileViewer = ({fileUrl, isImage}) => {
    console.log(isImage)
    return (
            isImage ? (
                <img src={fileUrl} className={' mt-8 w-[130rem] '}/>
            ) : (
                < iframe src={fileUrl} title="S3 File Viewer" width="100%" height="600px"/>
            )

    );
};

export default FileViewer;
