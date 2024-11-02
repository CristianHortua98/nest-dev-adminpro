import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { Repository } from 'typeorm';
import { Hospital } from './entities/hospital.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

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

  async listHospital(){

    return await this.hospitalRepository.find();

  }

  async findAll(paginationDto:PaginationDto){

    const { limit = 5, offset = 0 } = paginationDto;

    const hospitals = await this.hospitalRepository.find({
      take: limit, //CANTIDAD REGISTROS A OBTENER // LIMIT
      skip: offset, //CANTIDAD REGISTROS SE DEBEN SALTAR // DESDE
      relations: ['user']
    });

    const totalHospitals = await this.hospitalRepository.find();

    return {
      totalHospitals: totalHospitals.length,
      hospitals
    }

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

    const hospitalValid = await this.findOne(id);

    if(!hospitalValid){
      throw new BadRequestException(`Hospital ${id} not found`);
    }

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
    
    const hospital = await this.findOne(id);

    if(!hospital){
      throw new BadRequestException(`Hospital ${id} not found`);
    }

    try{

      return this.hospitalRepository.remove(hospital);
      
    }catch(error){
      
      console.log(error);
      throw new InternalServerErrorException(`Check logs server`);

    }

  }
}
