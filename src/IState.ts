export interface IState {
    info: IInfo
    results: IResult[]
}

export interface IResult {
        gender: string
        name: IName
        location: ILocation
        email: string
        login: ILogin
        dob: {
            date: string
            age: number
        },
        registered: {
            date: string
            age: number
        },
        phone: string
        cell: string
        id: {
            name: string,
            value: string
        },
        picture: {
            large: string
            medium: string
            thumbnail: string
        },
        nat: string   
}


interface IName {
    title: string
    first: string
    last: string
}

interface ILocation {
    street: {
        number: number,
        name: string
    },
    city: string
    state: string
    country: string
    postcode: number
    coordinates: {
        latitude: string
        longitude: string
    },
    timezone: {
        offset: string
        description: string
    }
}

interface ILogin {
    uuid: string
    username: string
    password: string
    salt: string
    md5: string
    sha1: string
    sha256: string
}

interface IInfo {
    page: number
    results: number
    seed: string
    version: string
}

export type Users = IUser[]

export interface IUser {
    firstName: string,
    lastName: string,
    email: string,
    city: string, 
    streetName: string,
    streetNum: number,
    plz: number,
    img: string
}