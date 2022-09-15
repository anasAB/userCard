import { IUser } from "../IState"

interface IState {
    user: IUser[]
}

export const getFirstName = (state: IState): any => state.user[0]?.firstName ? state.user[0]?.firstName : ''
export const getLastName = (state: IState): string => state.user[0]?.lastName ? state.user[0]?.lastName : ''
export const getEmail = (state: IState): string => state.user[0]?.email ? state.user[0]?.email: ''
export const getStreetName = (state: IState): string => state.user[0]?.streetName ? state.user[0].streetName : ''
export const getStreetNo = (state: IState): number => state.user[0]?.streetNum ? state.user[0].streetNum : 0
export const getPlz = (state: IState): number => state.user[0]?.plz ? state.user[0].plz : 0
export const getCity = (state: IState): string => state.user[0]?.city ? state.user[0].city: ''
export const getUserImg = (state: IState): string => state.user[0]?.img ? state.user[0].img : ''


export const getState = (state: any): any => state
// export const getFirstName = (state: IState): string => state.user.name?.first ? state.user.name?.first : ''