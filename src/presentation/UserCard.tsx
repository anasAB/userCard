import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Loader/LoadingSpinner';
// import { getCity, getEmail, getFirstName, getLastName, getPlz, getStreetNo, getStreetName, getUserImg, getState } from '../Selectors/userSelectors';
import { getFirstName, getState, getLastName } from '../Selectors/userSelectors';
import { createUsers, editUserInfo } from '../store/User/UserSlicer';
import Buttons from '../UIItems/Buttons';
import fetchData from '../utils/fetchData';

const UserCard = () => {

    const dispatch = useDispatch()
    const userFirstName = useSelector(getFirstName)
    console.log('###FIRST NAme',userFirstName);
    
    const userLastName = useSelector(getLastName)
    // const userEmail = useSelector(getEmail)
    // const userCity = useSelector(getCity)
    // const userStreetName = useSelector(getStreetName)
    // const userStreetNumber = useSelector(getStreetNo)
    // const userPlz = useSelector(getPlz)
    // const userImage = useSelector(getUserImg)

    const statex = useSelector(getState)
    console.log('##whole State',statex);
    
    
    const [isGenerated, setIsGenerated] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        // email: '',
        // city: '',
        // streetName: '',
        // streetNum: 0,
        // plz: 0,
        // img: ''
      })

    useEffect(() => {
        setState({
            firstName: userFirstName,
            lastName: userLastName,
            // email: userEmail,
            // city: userCity, 
            // streetName: userStreetName,
            // streetNum: userStreetNumber,
            // plz: userPlz,
            // img: userFirstName,
        })
     },
     [userFirstName]
    //  [userFirstName, userLastName, userEmail, userCity, userStreetName, userStreetNumber, userPlz ]
     )
     

    const formSubmitHandler = (event: any): void => {
        event.preventDefault()

        dispatch(editUserInfo({
            firstName:  state.firstName,
            lastName: state.lastName,
            // email: state.email,
            // city: state.city,
            // streetName: state.streetName,
            // streetNum: state.streetNum,
            // plz: state.plz,
            // img: state.img
        }))
        // props.submitFormData({
        //     name: firstName,
        //     lastName: lastNameField,
        //     email: emailField,
        //     city: cityField,
        //     street: streetField,
        //     zip: zipField
        // })


    }

    
    const generateUserHandler = () => {
        setFetching(true)
        fetchData()
        .then(() => {
            setFetching(false)
            setIsGenerated(true)
        })
        .catch(error => {
            setErrorStatus(true)
            return error.message
        });
    }
    
    
    const inputChangeHandler = (event:any): void => {
        const value: string | number = event.target.value;
        setState({
        ...state,
        [event.target.name]: value
        });
    }

    const createUserHandler = (): void => {
        dispatch(createUsers({...state}))
    }



// console.log('####STATE',state);

    if (isFetching) {
        return <LoadingSpinner />;
    }

    if (errorStatus) {
        return <h1>Something went wrong, Please Try Again....</h1>;
    }

return (
    <>
        <form className="needs-validation" noValidate >
            <div className="container">
                <div className="row">
                    {/* <img src={userImage} alt='x'/> */}
                    <div className="col-md-6 mb-3">
                        <label htmlFor="validationTooltip01">First name</label>
                        <input
                            name = 'firstName'
                            type="text"
                            className="form-control"
                            id="userFirstName"
                            placeholder="First name"
                            onChange={inputChangeHandler}
                            value={state.firstName}
                            required
                        />
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <label htmlFor="validationTooltip02">Last name</label>
                        <input
                            name = 'lastName'
                            type="text"
                            className="form-control"
                            id="LastName"
                            placeholder="Last name"
                            onChange={inputChangeHandler}
                            value={state.lastName}
                            required
                        />
                    </div>
                    {/* <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltipUsername">Email</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>
                                </div>
                                <input
                                    name = 'email'
                                    type="email"
                                    className="form-control"
                                    id="Email"
                                    placeholder="Email"
                                    onChange={inputChangeHandler}
                                    value={state.email}
                                    required
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip03">City</label>
                            <input
                                name = 'city'
                                type="text"
                                className="form-control"
                                id="city"
                                placeholder="City"
                                onChange={inputChangeHandler}
                                value={state.city}
                                required
                            />
                        </div>
                    </div> */}
                    {/* <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip04">Street</label>
                            <input
                                name='streetName'
                                type="text"
                                className="form-control"
                                id="street"
                                placeholder="Street Name"
                                onChange={inputChangeHandler}
                                value={state.streetName}
                                required
                            />
                        </div>
                         <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip04">Street Number</label>
                            <input
                            name='streetNum'
                                type="text"
                                className="form-control"
                                id="streetNumber"
                                placeholder="Hsnr."
                                onChange={inputChangeHandler}
                                value={state.streetNum}
                                required
                            />
                        </div> 
                         <div className="col-md-6 mb-3">
                            <label htmlFor="validationTooltip05">PLz</label>
                            <input
                                name='plz'
                                type="text"
                                className="form-control"
                                id="Plz"
                                placeholder="PLz"
                                onChange={inputChangeHandler}
                                value={state.plz}
                                required
                            />
                        </div> 
                     </div>  */}
                </div>
            </div>
        </form>
        <div>
            {
                isGenerated ?
                <>
                <Buttons handleButtonClick={formSubmitHandler}>Edit</Buttons> 
                <Buttons handleButtonClick={createUserHandler}>Create User</Buttons> 
                </>
                
                :
                <Buttons handleButtonClick={generateUserHandler}>Generate User</Buttons>
            }
        </div>
    </>
)
    
    
}
export default UserCard
