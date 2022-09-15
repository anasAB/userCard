import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Loader/LoadingSpinner';
import { setUserState } from '../store/User/UserSlicer';
import { fetchData } from '../utils/fetchData';
import UserCard from './UserCard';

const UserHomePage = () => {

    // const [isFetching, setFetching] = useState(false);
    // const [errorStatus, setErrorStatus] = useState(false);
    // const dispatch = useDispatch()

    
    // useEffect(() => {
    //     setFetching(true);
    //     fetchData()
    //     .then((data)=>{
    //         dispatch(setUserState(data.results[0]))
    //         setFetching(false)})
    //     .catch(error => { 
    //         setErrorStatus(true)
    //         setFetching(false)
    //         return error.message});
    // }, []);



    // if (isFetching) {
    //     return <LoadingSpinner />;
    // }

    // if (errorStatus) {
    //     return <h1>Something went wrong, Please Try Again....</h1>;
    // }

    return (
        <div>
            <UserCard />
        </div>
    )
}

export default UserHomePage