import { IUser } from "../IState"

interface IState {
    users: IUser[]
}

export const getFirstName = (state: IState): string => state.users[0]?.firstName ? state.users[0]?.firstName : ''
export const getLastName = (state: IState): string => state.users[0]?.lastName ? state.users[0]?.lastName : ''
export const getEmail = (state: IState): string => state.users[0]?.email ? state.users[0]?.email: ''
export const getStreetName = (state: IState): string => state.users[0]?.streetName ? state.users[0].streetName : ''
export const getStreetNo = (state: IState): number => state.users[0]?.streetNum ? state.users[0].streetNum : 0
export const getPlz = (state: IState): number => state.users[0]?.plz ? state.users[0].plz : 0
export const getCity = (state: IState): string => state.users[0]?.city ? state.users[0].city: ''
export const getUserImg = (state: IState): string => state.users[0]?.img ? state.users[0].img : ''


export const getState = (state: any): any => state
