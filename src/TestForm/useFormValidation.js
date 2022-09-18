import { useEffect, useState } from 'react'
import { IUser } from '../IState'
import { editUserInfo } from '../store/User/UserSlicer';
import { useDispatch } from 'react-redux';

export interface IForm {
    inputsFields: IUser,
    seUserInfoState: (inputsFields: IUser) => void,
    setIsReadOnly: (readOnly:boolean) => void,
}

const useFormValidation = (props: IForm) => {

    const { inputsFields, seUserInfoState, setIsReadOnly } = props
    const [formValid, setFormValid] = useState(false);
    const [firstNameValid, setfirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const [streetNameValid, setStreetNameValid] = useState(false);
    const [streetNumValid, setStreetNumValid] = useState(false);
    const [plzValid, setPlzValid] = useState(false);
    const [cityNameValid, setCityNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    
    const dispatch = useDispatch()

    const formValidStatus = firstNameValid && lastNameValid &&
        emailValid && streetNameValid &&
        streetNumValid && plzValid && cityNameValid


    useEffect(() => {

        validate(inputsFields)
        setFormValid(formValidStatus)

    }, [inputsFields, formValidStatus])

    const handleChange = (event: any) => {
        event.persist();
        let name = event.target.name;
        let val = event.target.value;
        seUserInfoState({
            ...inputsFields,
            [name]: val,
        })
    }

    const handleSubmit = (event: any) => {
        if (event) event.preventDefault();

        if (formValid) {
            dispatch(editUserInfo({
                firstName: inputsFields.firstName.trim(),
                lastName: inputsFields.lastName.trim(),
                email: inputsFields.email.trim(),
                city: inputsFields.city.trim(),
                streetName: inputsFields.streetName.trim(),
                streetNum: inputsFields.streetNum,
                plz: inputsFields.plz,
            }))
            setIsReadOnly(true)
        }
    }

    //! inputs Validation
    const validate = (state: IUser) => {
        if (state.firstName.trim() !== '') { setfirstNameValid(true) } else { setfirstNameValid(false) }
        if (state.lastName.trim() !== '') { setLastNameValid(true) } else { setLastNameValid(false) }
        if (state.streetName.trim() !== '') { setStreetNameValid(true) } else { setStreetNameValid(false) }
        if (state.streetNum.toString().trim() !== '') { setStreetNumValid(true) } else { setStreetNumValid(false) }
        if (state.city.trim() !== '') { setCityNameValid(true) } else { setCityNameValid(false) }
        if (state.plz.toString().trim() !== '') { setPlzValid(true) } else { setPlzValid(false) }

        if (new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(state.email)) {
            setEmailValid(true)
        } else {
            setEmailValid(false)
        }
    }

    const inputsValidation = {
        firstName: firstNameValid,
        lastName: lastNameValid,
        city: cityNameValid,
        streetName: streetNameValid,
        streetNum: streetNumValid,
        email: emailValid,
        plz: plzValid,
        formValid: formValid
    }

    return {
        inputsValidation,
        handleChange,
        handleSubmit
    }
}

export default useFormValidation