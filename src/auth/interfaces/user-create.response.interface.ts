import { User } from "../entities/user.entity";

export interface UserCreateReponse{

    user: User;
    token: string;

}