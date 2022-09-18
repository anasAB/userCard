import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Loader/LoadingSpinner';
import { getCity, getEmail, getFirstName, getLastName, getPlz, getStreetNo, getStreetName, getUserImg, getState } from '../Selectors/userSelectors';
import { createUsers, editUserInfo } from '../store/User/UserSlicer';
import useFormValidation from '../TestForm/useFormValidation';
import fetchData from '../utils/fetchData';
import Buttons from './Buttons';
import './userCard.css'

const UserCard = () => {

    const dispatch = useDispatch()
    const userFirstName = useSelector(getFirstName)
    const userLastName = useSelector(getLastName)
    const userEmail = useSelector(getEmail)
    const userCity = useSelector(getCity)
    const userStreetName = useSelector(getStreetName)
    const userStreetNumber = useSelector(getStreetNo)
    const userPlz = useSelector(getPlz)
    const userImage = useSelector(getUserImg)

    const statex = useSelector(getState)


    const [isGenerated, setIsGenerated] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [fetching, setFetching] = useState(false);

    const [userInfoState, seUserInfoState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        streetName: '',
        streetNum: 0,
        plz: 0,
        img: '',
    })

    const { inputsValidation, handleChange, handleSubmit } = useFormValidation({ 'inputsFields': userInfoState, seUserInfoState, setIsReadOnly });

    useEffect(() => {
        seUserInfoState({
            firstName: userFirstName.trim(),
            lastName: userLastName,
            email: userEmail,
            city: userCity,
            streetName: userStreetName,
            streetNum: userStreetNumber,
            plz: userPlz,
            img: userImage,
        })
    }, [userFirstName, userLastName, userEmail, userCity, userStreetName, userStreetNumber, userPlz, userImage]
    )

    //! Cancel changed input value
    const cancelEidtingHandler = (): void => {
        setIsReadOnly(true)
        seUserInfoState({
            firstName: userFirstName.trim(),
            lastName: userLastName.trim(),
            email: userEmail.trim(),
            city: userCity.trim(),
            streetName: userStreetName.trim(),
            streetNum: userStreetNumber,
            plz: userPlz,
            img: userImage,
        })
    }

    const generateUserHandler = (): void => {
        setFetching(true)
        fetchData()
            .then(() => {
                setFetching(false)
                setIsGenerated(true)
            })
            .catch(error => {
                console.warn(error.message)
            });
    }


    const createUserHandler = (): void => { dispatch(createUsers({ ...userInfoState })) }
    
    const warrningClassn = 'wrong-Input'
    return (

        <div className="App">
            <form onSubmit={handleSubmit}>

                {/*//! First Name */}
                <input type="text" 
                    className={`${!inputsValidation.firstName && warrningClassn} form-control`} name="firstName"
                    placeholder="First Name"
                    value={userInfoState.firstName}
                    onChange={handleChange}
                    disabled={isReadOnly}

                />
                {/*//! lastName */}
                <input type="text" 
                    className={`${!inputsValidation.lastName && warrningClassn} form-control`} name="lastName"
                    placeholder="Last Name"
                    value={userInfoState.lastName}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {/*//! Email */}
                <input type="email"
                    className={`${!inputsValidation.email && warrningClassn} form-control`}
                    name="email"
                    placeholder="email"
                    value={userInfoState.email}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {/*//! Street Name */}
                <input type="text" 
                    className={`${!inputsValidation.streetName && warrningClassn} form-control`}
                    name="streetName"
                    placeholder="Street Name"
                    value={userInfoState.streetName}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {/*//! plz */}
                <input type="text"
                    name='plz'
                    className={`${!inputsValidation.plz && warrningClassn} form-control`}
                    placeholder="plz"
                    value={userInfoState.plz}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {/*//! city */}
                <input type="text"
                    name='city'
                    className={`${!inputsValidation.city && warrningClassn} form-control`}
                    placeholder="City"
                    value={userInfoState.city}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {!inputsValidation.formValid && isGenerated ? <span>Something Wrong</span> : ''}


                 <Buttons
                    isGenerated={isGenerated}
                    isReadOnly={isReadOnly}
                    generateUser={generateUserHandler}
                    createUser={createUserHandler}
                    cancelEidtingHandler={cancelEidtingHandler}
                    formValidation = {inputsValidation.formValid}
                    setIsReadOnly={setIsReadOnly}
                />
            </form>

        </div>
    )
}


export default UserCard
