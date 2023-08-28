import {createContext, useContext, useState, useEffect, useMemo} from 'react';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({children}) => {
    const [currentCredentials, setCurrentCredentials] = useState(null);
    const [credentialsArr, setCredentialsArr] = useState([]);
    const [loadingCredentialsArr, setLoadingCredentialsArr] = useState(null);
    const [errorCredentialsArr, setErrorCredentialsArr] = useState(null);
    const [currentBucket, setCurrentBucket] = useState(null);
    const [buckets, setBuckets] = useState([]);
    const [loadingBuckets, setLoadingBuckets] = useState(null);
    const [errorBuckets, setErrorBuckets] = useState(null);

    // Load Credentials state from local storage on initial render
    useEffect(() => {
        const storedCredentials = localStorage.getItem('currentCredentials');
        if (storedCredentials) {
            setCurrentCredentials(JSON.parse(storedCredentials));
        }
    }, []);

    // Save Credentials state to local storage whenever it changes
    useEffect(() => {
        if (currentCredentials !== null) {
            localStorage.setItem('currentCredentials', JSON.stringify(currentCredentials));
        } else {
            localStorage.removeItem('currentCredentials');
        }
    }, [currentCredentials]);

    const resetGlobalState = () => {
        setCurrentCredentials(null);
        setCurrentBucket(null);
        setCredentialsArr([]);
        setBuckets([]);
    };
    const contextValue = {
        currentCredentials,
        setCurrentCredentials,
        credentialsArr,
        setCredentialsArr,
        loadingCredentialsArr,
        setLoadingCredentialsArr,
        errorCredentialsArr,
        setErrorCredentialsArr,
        currentBucket,
        setCurrentBucket,
        buckets,
        setBuckets,
        loadingBuckets,
        setLoadingBuckets,
        errorBuckets,
        setErrorBuckets,
        resetGlobalState,
}
    return (
        <GlobalStateContext.Provider
            value={contextValue}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export const useGlobalState = () => useContext(GlobalStateContext);
