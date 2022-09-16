import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Loader/LoadingSpinner';
import { getCity, getEmail, getFirstName, getLastName, getPlz, getStreetNo, getStreetName, getUserImg, getState } from '../Selectors/userSelectors';
import { createUsers, editUserInfo } from '../store/User/UserSlicer';
import fetchData from '../utils/fetchData';

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
    console.log('##whole State',statex);
    
    
    const [isGenerated, setIsGenerated] = useState(false);
    const [isFetching, setFetching] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);
    const [state, setState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        city: '',
        streetName: '',
        streetNum: 0,
        plz: 0,
        img: ''
      })

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
     },
     [userFirstName, userLastName, userEmail, userCity, userStreetName, userStreetNumber, userPlz, userImage ]
     )
     

    const changeEditorStatusTHandler = (): void => { setIsReadOnly(false) }

    const cancelEidtInputHandler = () =>{ setIsReadOnly(true)}

    const savingEidtedFormHandler = () =>{
        dispatch(editUserInfo({
            firstName:  state.firstName,
            lastName: state.lastName,
            email: state.email,
            city: state.city,
            streetName: state.streetName,
            streetNum: state.streetNum,
            plz: state.plz,
        }))
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
            console.warn(error.message)
            return 
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



    if (isFetching) {
        return <LoadingSpinner />;
    }

    if (errorStatus) {
        return <h1>Something went wrong, Please Try Again....</h1>;
    }

    const Buttons = () => {
        return (
            !isGenerated ?
                <button className="btn btn-primary" type="submit" onClick={generateUserHandler}>Generate User</button>
            :
            isReadOnly ?
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <button className="btn btn-primary" onClick={changeEditorStatusTHandler}>Edit</button>
                    </div>
                    <div className="form-group col-md-6">
                        <button className="btn btn-primary" type="submit" onClick={createUserHandler}>Create User</button>
                    </div>
                </div>  
            :
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <button className="btn btn-primary" onClick={cancelEidtInputHandler}>Cancel</button>
                    </div>
                    <div className="form-group col-md-6">
                        <button className="btn btn-primary" type="submit" onClick={savingEidtedFormHandler}>Save</button>
                    </div>
                </div>             
        )}
        
    return (
        <div className="card" style={{width: '18rem'}}>
            <img className="card-img-top" src={state.img} alt="Card x cap"/>
            <form>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <input type="text" className="form-control" id="firstName" placeholder="First Name" name='firstName' value={state.firstName} onChange={inputChangeHandler} readOnly={isReadOnly}/>
                    </div>
                    <div className="form-group col-md-6">
                    <   input type="text" className="form-control" id="lastName" placeholder="Last Name" name='lastName' value={state.lastName} onChange={inputChangeHandler} readOnly={isReadOnly}/>
                    </div>
                </div>

                <div className="form-group">
                    <input type="email" className="form-control" id="inputEmail4" placeholder="Email" readOnly={isReadOnly}/>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-8">
                        <input type="text" className="form-control" id="streetName" placeholder="Street Name" name='streetName' value={state.streetName} onChange={inputChangeHandler} readOnly={isReadOnly}/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="text" className="form-control" id="streetNumber" placeholder="Street Number" name='streetNum' value={state.streetNum} onChange={inputChangeHandler} readOnly={isReadOnly}/>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-4">
                        <input type="text" className="form-control" id="Plz" placeholder="Plz" name='plz' value={state.plz} onChange={inputChangeHandler} readOnly={isReadOnly}/>
                    </div>
                    <div className="form-group col-md-8">
                        <input type="text" className="form-control" id="city" placeholder="city" name='city' value={state.city} onChange={inputChangeHandler} readOnly={isReadOnly}/>
                    </div>
                </div>
            </form>
                <Buttons/>
        </div>
    )

}
    

export default UserCard


// {
//     isGenerated ?
//     <>
//     <button className="btn btn-primary" onClick={editUserInfoHandler}>Edit</button>
//     <button className="btn btn-primary" type="submit" onClick={createUserHandler}>Create User</button>
//     </>                
//     :
//     <button className="btn btn-primary" type="submit" onClick={generateUserHandler}>Generate User</button>
// }


    // <>
    //     <form className="needs-validation" noValidate >
    //         <div className="container">
    //             <div className="row">
    //                 <img src={state.img} alt='x'/>
    //                 <div className="col-md-6 mb-3">
    //                     <label htmlFor="validationTooltip01">First name</label>
    //                     <input
    //                         name = 'firstName'
    //                         type="text"
    //                         className="form-control"
    //                         id="userFirstName"
    //                         placeholder="First name"
    //                         onChange={inputChangeHandler}
    //                         value={state.firstName}
    //                         required
    //                     />
    //                 </div>
                    
    //                 <div className="col-md-6 mb-3">
    //                     <label htmlFor="validationTooltip02">Last name</label>
    //                     <input
    //                         name = 'lastName'
    //                         type="text"
    //                         className="form-control"
    //                         id="LastName"
    //                         placeholder="Last name"
    //                         onChange={inputChangeHandler}
    //                         value={state.lastName}
    //                         required
    //                     />
    //                 </div>
    //                 <div className="row">
    //                     <div className="col-md-6 mb-3">
    //                         <label htmlFor="validationTooltipUsername">Email</label>
    //                         <div className="input-group">
    //                             <div className="input-group-prepend">
    //                                 <span className="input-group-text" id="validationTooltipUsernamePrepend">@</span>
    //                             </div>
    //                             <input
    //                                 name = 'email'
    //                                 type="email"
    //                                 className="form-control"
    //                                 id="Email"
    //                                 placeholder="Email"
    //                                 onChange={inputChangeHandler}
    //                                 value={state.email}
    //                                 required
    //                             />
    //                         </div>
    //                     </div>
    //                     <div className="col-md-6 mb-3">
    //                         <label htmlFor="validationTooltip03">City</label>
    //                         <input
    //                             name = 'city'
    //                             type="text"
    //                             className="form-control"
    //                             id="city"
    //                             placeholder="City"
    //                             onChange={inputChangeHandler}
    //                             value={state.city}
    //                             required
    //                         />
    //                     </div>
    //                 </div>
    //                 <div className="row">
    //                     <div className="col-md-6 mb-3">
    //                         <label htmlFor="validationTooltip04">Street</label>
    //                         <input
    //                             name='streetName'
    //                             type="text"
    //                             className="form-control"
    //                             id="street"
    //                             placeholder="Street Name"
    //                             onChange={inputChangeHandler}
    //                             value={state.streetName}
    //                             required
    //                         />
    //                     </div>
    //                      <div className="col-md-6 mb-3">
    //                         <label htmlFor="validationTooltip04">Street Number</label>
    //                         <input
    //                         name='streetNum'
    //                             type="text"
    //                             className="form-control"
    //                             id="streetNumber"
    //                             placeholder="Hsnr."
    //                             onChange={inputChangeHandler}
    //                             value={state.streetNum}
    //                             required
    //                         />
    //                     </div> 
    //                      <div className="col-md-6 mb-3">
    //                         <label htmlFor="validationTooltip05">PLz</label>
    //                         <input
    //                             name='plz'
    //                             type="text"
    //                             className="form-control"
    //                             id="Plz"
    //                             placeholder="PLz"
    //                             onChange={inputChangeHandler}
    //                             value={state.plz}
    //                             required
    //                         />
    //                     </div> 
    //                  </div> 
    //             </div>
    //         </div>
    //     </form>
    //     <div>
    //         {
    //             isGenerated ?
    //             <>
    //             <Buttons handleButtonClick={editUserInfoHandler}>Edit</Buttons> 
    //             <Buttons handleButtonClick={createUserHandler}>Create User</Buttons> 
    //             </>
                
    //             :
    //             <Buttons handleButtonClick={generateUserHandler}>Generate User</Buttons>
    //         }
    //     </div>
    // </>