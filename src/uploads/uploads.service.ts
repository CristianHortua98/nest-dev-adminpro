import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { User } from 'src/auth/entities/user.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Hospital } from 'src/hospitals/entities/hospital.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UploadsService {

    constructor(
        
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Hospital)
        private readonly hospitalRepository: Repository<Hospital>,

        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>


    ){}

    async updateFile(type: string, id: number, path: string, filename: string){

        switch(type){

            case 'users':

                const user = await this.userRepository.findOneBy({id: id})

                if(!user){
                    // console.log(`Not found User: ${id}`);
                    unlinkSync(join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${filename}`));
                    throw new BadRequestException(`Not found User: ${id}`);
                }

                let pathOldUser = join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${user.img}`);

                this.deleteFile(pathOldUser);
                
                user.img = filename;

                await this.userRepository.save(user);

                return {
                    path
                };

            break;

            case 'hospitals':

                const hospital = await this.hospitalRepository.findOneBy({id: id});

                if(!hospital){
                    unlinkSync(join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${filename}`));
                    throw new BadRequestException(`Not found Hospital: ${id}`);
                }

                let pathOldHospital = join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${hospital.img}`);

                this.deleteFile(pathOldHospital);

                hospital.img = filename;

                await this.hospitalRepository.save(hospital);

                return {
                    path
                };

            break;

            case 'doctors':

                const doctor = await this.doctorRepository.findOneBy({id: id});

                if(!doctor){
                    unlinkSync(join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${filename}`));
                    throw new BadRequestException(`Not found Doctor: ${id}`);
                }

                let pathOldDoctor = join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${doctor.img}`);

                this.deleteFile(pathOldDoctor);

                doctor.img = filename;

                await this.doctorRepository.save(doctor);

                return {
                    path
                };

            break;

        }

    }

    getStaticFile(type: string, fileName: string){

        const path = join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${fileName}`);

        if(!existsSync(path)){
            throw new BadRequestException(`File not found with ${fileName}`);
        }

        return path;

    }

    private deleteFile(path: string){

        if(existsSync(path)){
            unlinkSync(path);
        }

    }

}
