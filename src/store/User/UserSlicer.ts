import { createSlice } from '@reduxjs/toolkit'
import { IResult, IUser, Users } from '../../IState'
import { initialUserState } from './initialUserState';


export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserState: (state: Users, action: { payload: IResult }) => {
            const payload = action.payload

            state.push({
                firstName: payload.name.first,
                lastName: payload.name.last,
                email: payload.email,
                city: payload.location.city,
                streetName: payload.location.street.name,
                streetNum: payload.location.street.number,
                plz: payload.location.postcode,
                img: payload.picture.large
            })
        },

        editUserInfo: (state: any, action) => {
            const newState: { [index: string]: IUser } = action.payload
            let key: any;
            for (key in newState) {
                state[0][key] = newState[key]
            }
        },

        createUsers: (state: Users, action: { payload: IUser }) => { 
            console.log('###PAYLOAD',action.payload);      
            
            state.push(action.payload) },

    },
})

export const { setUserState, editUserInfo, createUsers } = userSlice.actions

export default userSlice.reducer

