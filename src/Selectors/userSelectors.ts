import { IUser } from "../IState"

interface IState {
    user: IUser
}

export const getFirstName = (state: IState): string => state.user.firstName ? state.user.firstName : ''
export const getLastName = (state: IState): string => state.user.lastName ? state.user.lastName : ''
export const getEmail = (state: IState): string => state.user?.email ? state.user?.email: ''
export const getStreetName = (state: IState): string => state.user.streetName ? state.user.streetName : ''
export const getStreetNo = (state: IState): number => state.user.streetNum ? state.user.streetNum : 0
export const getPlz = (state: IState): number => state.user.plz ? state.user.plz : 0
export const getCity = (state: IState): string => state.user.city ? state.user.city: ''
export const getUserImg = (state: IState): string => state.user.img ? state.user.img : ''


export const getState = (state: any): any => state
// export const getFirstName = (state: IState): string => state.user.name?.first ? state.user.name?.first : ''