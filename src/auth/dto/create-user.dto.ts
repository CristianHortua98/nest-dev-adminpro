import { Type } from "class-transformer";
import { IsEmail, IsLowercase, IsNumber, IsNumberString, IsString, Length, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{

    @IsString()
    @MinLength(5)
    name: string;

    @IsString()
    @MinLength(4)
    user: string;


    @IsString()
    @IsEmail()
    @MinLength(5)
    email:string;

    // @Type(() => Number)
    @IsNumberString()
    @Length(1, 20)
    document: number;


    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @IsString()
    img: string;

}