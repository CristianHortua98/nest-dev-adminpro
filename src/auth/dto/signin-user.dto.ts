import { IsString, MaxLength, MinLength } from "class-validator";

export class SignInUserDto{

    @IsString()
    @MinLength(4)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    password: string;

}