import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { existsSync, unlinkSync } from 'fs';
import { join } from 'path';
import { User } from 'src/auth/entities/user.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Hospital } from 'src/hospitals/entities/hospital.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs-extra';

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

                if (!user) {
                    throw new BadRequestException(`Not found User: ${id}`);
                }

                let pathOldUser = join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${user.img}`);

                try {
                    // Elimina la imagen anterior si existe
                    if(user.img){
                        if (fs.existsSync(pathOldUser)) {
                            fs.unlinkSync(pathOldUser);
                        }
                    }
                } catch (error) {
                    console.error('Error eliminando la imagen anterior:', error);
                }
                
                user.img = filename;
                await this.userRepository.save(user);

                return {
                    path,
                    filename
                };

            break;

            case 'hospitals':

                const hospital = await this.hospitalRepository.findOneBy({id: id});

                if(!hospital){
                    throw new BadRequestException(`Not found Hospital: ${id}`);
                }

                let pathOldHospital = join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${hospital.img}`);

                try {
                    if(user.img){
                        if (fs.existsSync(pathOldHospital)) {
                            fs.unlinkSync(pathOldHospital);
                        }
                    }
                } catch (error) {
                    console.error('Error eliminando la imagen anterior:', error);
                }

                hospital.img = filename;

                await this.hospitalRepository.save(hospital);

                return {
                    path,
                    filename
                };

            break;

            case 'doctors':

                const doctor = await this.doctorRepository.findOneBy({id: id});

                if(!doctor){
                    throw new BadRequestException(`Not found Doctor: ${id}`);
                }

                let pathOldDoctor = join(__dirname, `../../../archivos-admin-pro/uploads/${type}/${doctor.img}`);

                try {
                    if(user.img){
                        if (fs.existsSync(pathOldDoctor)) {
                            fs.unlinkSync(pathOldDoctor);
                        }
                    }
                } catch (error) {
                    console.error('Error eliminando la imagen anterior:', error);
                }

                doctor.img = filename;

                await this.doctorRepository.save(doctor);

                return {
                    path,
                    filename
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
