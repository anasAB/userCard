import React, { useEffect, useState } from 'react'
import { IUser } from '../IState'



const useFormValidation = (props: any) => {
    const { inputs }: IUser = props
    console.log('### props', inputs);
    const [formValid, setFormValid] = useState(false);
    const [firstNameValid, setfirstNameValid] = useState(false);
    const [lastNameValid, setLastNameValid] = useState(false);
    const [streetNameValid, setStreetNameValid] = useState(false);
    const [streetNumValid, setStreetNumValid] = useState(false);
    const [plzValid, setPlzValid] = useState(false);
    const [cityNameValid, setCityNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const formValidStatus = firstNameValid && lastNameValid && emailValid && streetNameValid && streetNumValid && plzValid && cityNameValid

    useEffect(() => {
        validate(inputs)
        setFormValid(formValidStatus)
    }, [inputs,formValidStatus])

    const validate = (state: IUser) => {
        if (state.firstName !== '') { setfirstNameValid(true) } else { setfirstNameValid(false) }
        if (state.lastName !== '') { setLastNameValid(true) } else { setLastNameValid(false) }
        if (state.streetName !== '') { setStreetNameValid(true) } else { setStreetNameValid(false) }
        if (state.streetNum !== '') { setStreetNumValid(true) } else { setStreetNumValid(false) }
        if (state.city !== '') { setCityNameValid(true) } else { setCityNameValid(false) }
        if (state.plz !== '') { setPlzValid(true) } else { setPlzValid(false) }

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
        inputsValidation
    }
}

export default useFormValidation