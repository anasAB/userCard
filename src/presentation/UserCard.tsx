import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../Loader/LoadingSpinner';
import { getCity, getEmail, getFirstName, getLastName, getPlz, getStreetNo, getStreetName, getUserImg, getState } from '../Selectors/userSelectors';
import { createUsers, editUserInfo } from '../store/User/UserSlicer';
import fetchData from '../utils/fetchData';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import FormExample from '../TestForm/Formtwo';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';




const UserCard = () => {
    // const { register, handleSubmit, formState: { errors } } = useForm();

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
    const cancelEidtInputHandler = () => {
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

    const savingEidtedFormHandler = () => {
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


    const inputChangeHandler = (event: any): void => {
        event.persist();
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
        const payload ={
            name:event.target.name,
            value: event.target.value
        }
        // dispatch(updateValues(payload))

    }

    const createUserHandler = (): void => {
        dispatch(createUsers({ ...state }))
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
                            <Button className="btn btn-primary" onClick={changeEditorStatusTHandler}>Edit</Button>
                        </div>
                        <div className="form-group col-md-6">
                            <Button className="btn btn-primary" type="submit" onClick={createUserHandler}>Create User</Button>
                        </div>
                    </div>
                    :
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <Button className="btn btn-primary" onClick={cancelEidtInputHandler}>Cancel</Button>
                        </div>
                        <div className="form-group col-md-6">
                            <Button type="submit">Save</Button>
                        </div>
                    </div>
        )
    }


    const handleSubmit = (event: any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            console.log('###form. validty One ', form.checkValidity());
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
    };
    
    console.log('##whole State', statex);
    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" >
                    <Form.Label>First xxxme</Form.Label>
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
                    <Form.Label>Last name</Form.Label>
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
            <Buttons></Buttons>
        </Form>
    );
}


export default UserCard
