export interface Users {
    data: User[]
}

export interface User {
    id: string
    userName: string,
    email: string,
    password: string,
    imgProfile: string
}