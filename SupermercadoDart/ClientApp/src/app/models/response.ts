export interface ResponseModel {
    accessToken: string,
    refreshToken: string,
    autenticated: boolean,
    created: Date,
    expiration: Date,
    message: string
}