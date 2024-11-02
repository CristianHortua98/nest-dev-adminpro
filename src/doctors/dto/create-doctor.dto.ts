import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateDoctorDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    img?: string;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    id_hospital: number;


}
