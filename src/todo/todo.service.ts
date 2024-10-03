import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Hospital } from 'src/hospitals/entities/hospital.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class TodoService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    @InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>


  ){}

  async busqueda(busqueda: string){

    const users = await this.userRepository.find({
      where: { name: Like(`%${busqueda}%`) }
    });


    const doctors = await this.doctorRepository.find({
      where: {name: Like(`%${busqueda}%`)}
    });


    const hospitals = await this.hospitalRepository.find({
      where: { name: Like(`%${busqueda}%`) }
    });

    return {
      users,
      doctors,
      hospitals
    };

  }


  async tipoBusqueda(categoria: string, busqueda: string){

    let data = [];

    switch (categoria) {
      case 'users':
        
        data = await this.userRepository.find({
          where: { name: Like(`%${busqueda}%`) }
        });

        break;

      case 'doctors':

        data = await this.doctorRepository.find({
          where: { name: Like(`%${busqueda}%`) }
        });

        break;

      case 'hospitals':

        data = await this.hospitalRepository.find({
          where: { name: Like(`%${busqueda}%`) }
        });

      default:
        throw new BadRequestException(`Error Parameters Search`);

    }

    return data;

  }

}
