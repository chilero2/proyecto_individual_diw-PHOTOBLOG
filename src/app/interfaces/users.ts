export interface Users {
    data: User[]
}

export interface User {
    id: string
    username: string,
    email: string,
    password: string,
    imgProfile?: string
}