import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';

@Injectable()
export class HospitalsService {

  constructor(

    @InjectRepository(Hospital)
    private readonly hospitalRepository: Repository<Hospital>

  ){}
  
  async create(request: Request, createHospitalDto: CreateHospitalDto): Promise<Hospital>{

    if(!request['user']){
      throw new UnauthorizedException(`There is not Bearer Token`);
    }
    
    const userInfo: User = request['user'];
    const { name, img } = createHospitalDto;

    try{

      const hospital = this.hospitalRepository.create({
        name,
        img,
        user: userInfo 
      })

      return await this.hospitalRepository.save(hospital);
      
    }catch(error){

      console.log(error);
      throw new InternalServerErrorException(`Check logs server`);

    }

  }

  findAll(): Promise<Hospital[]>{

    return this.hospitalRepository.find();

  }

  findOne(id: number): Promise<Hospital>{
    return this.hospitalRepository.findOneBy({
      id: id
    })
  }

  async update(id: number, request: Request, updateHospitalDto: UpdateHospitalDto) {
    
    if(!request['user']){
      throw new UnauthorizedException(`There is not Bearer Token`);
    }

    const user: User = request['user'];

    try{

      const hospital = await this.hospitalRepository.preload({
        id: id,
        user:user,
        ...updateHospitalDto
      })

      return await this.hospitalRepository.save(hospital);
      
    }catch(error) {
      
      console.log(error);
      throw new InternalServerErrorException(`Check logs server`);

    }
  
  }

  async remove(id: number) {

    try{

      const hospital = await this.findOne(id);

      if(!hospital){
        throw new BadRequestException(`Hospital ${id} not found`);
      }

      return this.hospitalRepository.remove(hospital);
      
    }catch(error){
      
      console.log(error);
      throw new InternalServerErrorException(`Check logs server`);

    }

  }
}