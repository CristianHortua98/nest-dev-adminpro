import { Type } from "class-transformer";
import { IsEmail, IsLowercase, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches, Max, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDto{

    @IsString()
    @MinLength(5)
    name: string;

    @IsString()
    @MinLength(4)
    username: string;


    @IsString()
    @IsEmail()
    @MinLength(5)
    email:string;

    @Type(() => Number)
    @Min(100000)
    @Max(99999999999999)
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
    @IsOptional()
    img?: string;

}