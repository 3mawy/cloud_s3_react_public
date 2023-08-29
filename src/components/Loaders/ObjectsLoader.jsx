import Loader from "./Loader.jsx";


const ObjectsLoader = ({className, children, loadingObjects, errorObjects}) => {


    return (
        <div>
            {loadingObjects && (
                <div className={`${className} absolute inset-0 flex justify-center`}>
                    <Loader/>
                </div>
            )}
            {errorObjects && <div
                className={`${className} text-danger absolute inset-0 flex justify-center text-center place-items-center`}>
                <p>No Objects yet</p></div>}
            {(!loadingObjects && !errorObjects) && children}
        </div>
    );
};

export default ObjectsLoader;
