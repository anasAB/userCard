import React, {useState} from 'react'

const useLocalStorage = (storageKey:any, fallbackState:any) => {
    const [value, setValue] = useState(
        localStorage.getItem(storageKey) ?? fallbackState
    );

    React.useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
    }, [value, storageKey]);

    return [value, setValue];
};

export default useLocalStorage