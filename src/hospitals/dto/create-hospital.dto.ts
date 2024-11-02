import { IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHospitalDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    img?: string;

}
