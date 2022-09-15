import { createSlice } from '@reduxjs/toolkit'
import { IResult, IUser } from '../../IState'
import { initialUserState } from './initialUserState';


export const userSlice = createSlice({
    name: 'user',
    initialState: initialUserState,
    reducers: {
        setUserState: (state: IUser[], action: {payload :IResult}) => {
            const payload = action.payload 
            // return { ...state, ...action.payload }            
            return { ...state, 
                firstName: payload.name.first,
                lastName: payload.name.last,
                email: payload.email,
                city: payload.location.city,
                streetName: payload.location.street.name,
                streetNum: payload.location.street.number,
                plz: payload.location.postcode,
                img: payload.picture.medium
            }            
        },

        editUserInfo: (state:IUser[], action) => {
            const newState = action.payload
            let key:any;
            for(key in newState ){
                state[key] = newState[key]
            }            
        },

        createUsers: (state:IUser[], action) => {
            console.log('### Create new User',action.payload);
            
            const payload = action.payload
            return {...state, user:{...payload}}
        }


    },
})

export const { setUserState, editUserInfo, createUsers } = userSlice.actions

export default userSlice.reducer

