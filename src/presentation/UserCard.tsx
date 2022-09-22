import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Loader/LoadingSpinner';
import WarningPresentation from './WarningPresentation';
import { createUsers } from '../store/User/UserSlicer';
import useFormValidation from '../utils/useForm';
import fetchData from '../utils/fetchData';
import { getCity, getEmail, getFirstName, getLastName, getPlz, getStreetNo, getStreetName, getUserImg, getState } from '../Selectors/userSelectors';
import Buttons from './Buttons';
import Img from '../assets/placeholder.jpg'
import '../style.css'

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
        firstName: ''.trim(),
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
    
    
    if(fetching) {
        return ( <div className="wrapper"> <LoadingSpinner/> </div> )
     }

    return (

        <div className="wrapper">

            {!inputsValidation.formValid && isGenerated  ? <WarningPresentation /> : ''} 

            <figure className="picture">
                <img src={userInfoState.img ? userInfoState.img: Img } alt={userInfoState.img}/>
            </figure>

            <form className={isReadOnly ? 'default' : 'editable'} onSubmit={handleSubmit}>
                <div className='row'>

                    {/*//! First Name */}
                    <input type="text"
                        className='grid-6-12'
                        name="firstName"
                        placeholder="First Name"
                        value={userInfoState.firstName}
                        onChange={handleChange}
                        disabled={isReadOnly}
                        pattern='^[\p{L}\s-][^]+$'
                        required
                    />

                    {/*//! lastName */}
                    <input type="text"
                        className='grid-6-1'
                        name="lastName"
                        placeholder="Last Name"
                        value={userInfoState.lastName}
                        onChange={handleChange}
                        disabled={isReadOnly}
                        pattern='^[\p{L}\s][^]+$'
                        required
                    />
                </div>

                <div className='row'>
                    {/*//! Email */}
                    <input type="email"
                        className='grid-12-12'
                        name="email"
                        placeholder="email"
                        value={userInfoState.email}
                        onChange={handleChange}
                        disabled={isReadOnly}
                        required
                    />
                </div>

                {/*//! street Name */}
                <div className='row'>
                    <input type="text"
                        className='grid-9-12'
                        name="streetName"
                        placeholder="Strasse"
                        value={userInfoState.streetName}
                        onChange={handleChange}
                        disabled={isReadOnly}
                        pattern='^[\p{L}\s-][^]+$'
                        inputMode='text'
                        required
                    />

                    {/*//! House Number */}
                    <input type="text"
                        className='grid-3-12'
                        name="streetNum"
                        placeholder="Hsnr."
                        value={userInfoState.streetNum}
                        onChange={handleChange}
                        disabled={isReadOnly}
                        pattern="[0-9]+"
                        inputMode="decimal"
                        required
                    />
                </div>

                <div className='row'>
                    {/*//! Plz */}
                    <input type="text"
                        className='grid-5-12'
                        name="plz"
                        placeholder="PLZ"
                        value={userInfoState.plz}
                        onChange={handleChange}
                        disabled={isReadOnly}
                        pattern=".{3,8}"
                        inputMode='text'
                        required
                    />

                    {/*//! City */}
                    <input type="text"
                        className='grid-7-12'
                        name="city"
                        placeholder="Ort."
                        value={userInfoState.city}
                        onChange={handleChange}
                        disabled={isReadOnly}
                        pattern='^[\p{L}\s-][^]+$'
                        inputMode='text'
                        required
                    />
                </div>

                <Buttons
                    isGenerated={isGenerated}
                    isReadOnly={isReadOnly}
                    generateUser={generateUserHandler}
                    createUser={createUserHandler}
                    cancelEidtingHandler={cancelEidtingHandler}
                    formValidation={inputsValidation.formValid}
                    setIsReadOnly={setIsReadOnly}
                />
            </form>
        </div>
    )
}


export default UserCard
