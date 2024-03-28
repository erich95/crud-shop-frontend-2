import { User } from "../user";

export class Request {
    statusCode! : number;
    error!: string;
    message!: string;
    token!: string;
    refreshToken!: string;
    expirationTime!: string;
    name!: string;
    email!: string;
    role!: string;
    surname!: string;
    password!: string;
    newPassword!: string;
    user!: User;
}