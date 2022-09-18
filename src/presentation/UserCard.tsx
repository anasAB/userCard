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



    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        streetName: '',
        streetNum: 0,
        plz: 0,
        img: '',
    })

    const { inputsValidation } = useFormValidation({ 'inputs': state });



    useEffect(() => {
        setState({
            firstName: userFirstName,
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

    //! set the input fileds to be editable  
    const changeEditorStatusTHandler = (): void => { setIsReadOnly(false) }

    //! Cancel changed input value
    const cancelEidtingHandler = () => {
        setIsReadOnly(true)
        setState({
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            city: userCity,
            streetName: userStreetName,
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


    const createUserHandler = (): void => { dispatch(createUsers({ ...state })) }

    console.log('##whole State', statex);


    const handleSubmit = (event: any) => {
        if (event) event.preventDefault();

        if (inputsValidation.formValid) {
            dispatch(editUserInfo({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                city: state.city,
                streetName: state.streetName,
                streetNum: state.streetNum,
                plz: state.plz,
            }))
            setIsReadOnly(true)
        }
    }

    const handleChange = (event: any) => {
        event.persist();
        let name = event.target.name;
        let val = event.target.value;
        setState({
            ...state,
            [name]: val,
        })

    }


    const warrningClassn = 'wrong-Input'
    return (

        <div className="App">
            <form onSubmit={handleSubmit}>

                {/*//! First Name */}
                <input type="text" className={!inputsValidation.firstName ? `${warrningClassn} form-control` : 'form-control'} name="firstName"
                    placeholder="First Name"
                    value={state.firstName}
                    onChange={handleChange}
                    disabled={isReadOnly}

                />
                {/*//! lastName */}
                <input type="text" className={!inputsValidation.lastName ? `${warrningClassn} form-control` : 'form-control'} name="lastName"
                    placeholder="Last Name"
                    value={state.lastName}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {/*//! Email */}
                <input type="email"
                    className={!inputsValidation.email ? `${warrningClassn} form-control` : 'form-control'}
                    name="email"
                    placeholder="email"
                    value={state.email}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {/*//! Street Name */}
                <input type="text" 
                    className={!inputsValidation.streetName ? `${warrningClassn} form-control` : 'form-control'}
                    name="streetName"
                    placeholder="Street Name"
                    value={state.streetName}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {/*//! plz */}
                <input type="text"
                    name='plz'
                    className={!inputsValidation.plz ? `${warrningClassn} form-control` : 'form-control'}
                    placeholder="plz"
                    value={state.plz}
                    onChange={handleChange}
                    disabled={isReadOnly}
                />

                {!inputsValidation.formValid && isGenerated ? <span>Something Wrong</span> : ''}


                 <Buttons
                    isGenerated={isGenerated}
                    isReadOnly={isReadOnly}
                    generateUser={generateUserHandler}
                    changeEditor={changeEditorStatusTHandler}
                    createUser={createUserHandler}
                    cancelEidtingHandler={cancelEidtingHandler}
                    formValidation = {inputsValidation.formValid}
                />
            </form>

        </div>
    )
}


export default UserCard
