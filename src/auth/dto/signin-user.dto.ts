import { IsString, MaxLength, MinLength } from "class-validator";

export class SignInUserDto{

    @IsString()
    @MinLength(4)
    user: string;

    @IsString()
    @MinLength(4)
    @MaxLength(15)
    password: string;

}