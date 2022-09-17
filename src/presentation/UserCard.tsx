import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Loader/LoadingSpinner';
import { getCity, getEmail, getFirstName, getLastName, getPlz, getStreetNo, getStreetName, getUserImg, getState } from '../Selectors/userSelectors';
import { createUsers, editUserInfo } from '../store/User/UserSlicer';
import fetchData from '../utils/fetchData';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image'
import Buttons from './Buttons';


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
    const [isFetching, setFetching] = useState(false);
    const [errorStatus, setErrorStatus] = useState(false);
    const [isReadOnly, setIsReadOnly] = useState(true);

    const [validated, setValidated] = useState(false);


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
                setErrorStatus(true)
                console.warn(error.message)
            });
    }


    const inputChangeHandler = (event: any): void => {
        event.persist();
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const createUserHandler = (): void => { dispatch(createUsers({ ...state })) }


    if (isFetching) {
        return <LoadingSpinner />;
    }

    if (errorStatus) {
        return <h1>Something went wrong, Please Try Again....</h1>;
    }

    const submitHandler = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        if (form.checkValidity()) {
            dispatch(editUserInfo({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                city: state.city,
                streetName: state.streetName,
                streetNum: state.streetNum,
                plz: state.plz,
            }))
        }
        setValidated(true);
        setIsReadOnly(true)
    };

    console.log('##whole State', statex);
    return (
        <Form noValidate validated={validated} onSubmit={submitHandler}>
            <Image src={state.img} fluid={true} rounded={true} roundedCircle={true} thumbnail={true} />
            <Row className="mb-3">
                <Form.Group as={Col} md="4" >
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                        name='firstName'
                        value={state.firstName}
                        onChange={inputChangeHandler}
                        disabled={isReadOnly}
                    />
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                        name='lastName'
                        value={state.lastName}
                        onChange={inputChangeHandler}
                        disabled={isReadOnly}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="12" >
                    <Form.Control
                        required
                        type="email"
                        placeholder="Email"
                        name='email'
                        value={state.email}
                        onChange={inputChangeHandler}
                        disabled={isReadOnly}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="8" >
                    <Form.Control
                        required
                        type="text"
                        placeholder="Street Name"
                        name='streetName'
                        value={state.streetName}
                        onChange={inputChangeHandler}
                        disabled={isReadOnly}
                    />
                </Form.Group>
                <Form.Group as={Col} md="4" >
                    <Form.Control
                        required
                        type="text"
                        placeholder="House Number"
                        name='streetNum'
                        value={state.streetNum}
                        onChange={inputChangeHandler}
                        disabled={isReadOnly}
                    />
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="5" >
                    <Form.Control
                        required
                        type="text"
                        placeholder="Plz"
                        name='plz'
                        value={state.plz}
                        onChange={inputChangeHandler}
                        disabled={isReadOnly}
                    />
                </Form.Group>
                <Form.Group as={Col} md="7" >
                    <Form.Control
                        required
                        type="text"
                        placeholder="City"
                        name='city'
                        value={state.city}
                        onChange={inputChangeHandler}
                        disabled={isReadOnly}
                    />
                </Form.Group>
            </Row>
            <Buttons 
                isGenerated={isGenerated}
                isReadOnly={isReadOnly}
                generateUser={generateUserHandler}
                changeEditor= {changeEditorStatusTHandler}
                createUser={createUserHandler}
                cancelEidtingHandler = {cancelEidtingHandler}
            />
        </Form>
    );
}


export default UserCard
