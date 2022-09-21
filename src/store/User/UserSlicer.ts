import { createSlice } from '@reduxjs/toolkit'
import { IResult, IUser, Users } from '../../IState'
import { initialUserState } from './initialUserState';


export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserState: (state: Users, action: { payload: IResult }) => {
            console.log('### Set User Info ACTION');

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
            console.log('### Edit User Info ACTION');
            const payLoad: { [index: string]: IUser } = action.payload
            let key: any;
            for (key in payLoad) {
                state[0][key] = payLoad[key]
            }
        },

        createUsers: (state: Users, action: { payload: IUser }) => { 
            console.log('### Create New User ACTION');
            state.push(action.payload) },

    },
})

export const { setUserState, editUserInfo, createUsers } = userSlice.actions

export default userSlice.reducer

