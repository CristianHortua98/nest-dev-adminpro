import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { HospitalsService } from '../hospitals/hospitals.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Hospital } from 'src/hospitals/entities/hospital.entity';
import { PaginationDto } from '../common/dtos/pagination.dto';

@Injectable()
export class DoctorsService {

  constructor(

    @InjectRepository(Doctor)
    private readonly doctorRepository: Repository<Doctor>,

    private readonly hospitalsService: HospitalsService

  ){}

  async create(request: Request, createDoctorDto: CreateDoctorDto): Promise<Doctor>{

    const { id_hospital, ...doctorDetails } = createDoctorDto;

    if(!request['user']){
      throw new UnauthorizedException(`There is not Bearer Token`);
    }

    const user: User = request['user']; 
    //OBTENER HOSPITAL
    const hospital = await this.hospitalsService.findOne(id_hospital);

    if(!hospital){
      throw new BadRequestException(`Hospital not exist`);
    }

    try{

      const newDoctor = this.doctorRepository.create({
        ...doctorDetails,
        hospital,
        user: user
      });

      return await this.doctorRepository.save(newDoctor);
      
    }catch(error){

      console.log(error);
      throw new InternalServerErrorException(`Check logs server`);

    }

  }

  findAll(paginationDto:PaginationDto): Promise<Doctor[]>{

    const { limit = 10, offset = 0 } = paginationDto;


    return this.doctorRepository.find({
      take: limit, //CANTIDAD REGISTROS A OBTENER // LIMIT
      skip: offset, //CANTIDAD REGISTROS SE DEBEN SALTAR // DESDE
      relations: ['hospital', 'user']
    });
  }

  listDoctors() {

    return this.doctorRepository
      .createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.hospital', 'hospital')
      .leftJoinAndSelect('doctor.user', 'user')
      .select([
        'doctor.id',
        'doctor.name',
        'doctor.img',
        'hospital.name',
        'hospital.img',
        'user.id',
        'user.name',
        'user.username',
      ])
      .getMany();

  }


  async findOneDoctor(id: number){
    return await this.doctorRepository.findOneBy({id: id});
  }

  async findOne(id: number) {
    const doctor = await this.doctorRepository.find({
      select: {id: true, name: true, img: true},
      where: {id: id},
      relations: ['hospital', 'user']
    });

    return doctor;

  }

  async findOneDoctorBuilder(id: number){

    const doctor = this.doctorRepository.createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.hospital', 'hospital')
      .leftJoinAndSelect('doctor.user', 'user')
      .select([
        'doctor.id', 
        'doctor.name', 
        'doctor.img',
        'hospital.id',
        'hospital.name',
        'user.id',
        'user.name',
        'user.username'
      ])
      .where('doctor.id = :id', {id})
      .getOne();

    return doctor;

  }

  async update(id: number, request: Request, updateDoctorDto: UpdateDoctorDto) {

    const { id_hospital, ...doctorDetails } = updateDoctorDto;

    if(!request['user']){
      throw new UnauthorizedException(`There is not Bearer Token`);
    }

    const user: User = request['user'];

    const hospital = await this.hospitalsService.findOne(id_hospital);

    if(!hospital){
      throw new BadRequestException(`Hospital not exist`);
    }

    const doctorValid = await this.findOneDoctor(id);

    if(!doctorValid){
      throw new BadRequestException(`Doctor: ${id} not found.`);
    }

    try{

      const doctorUpd = await this.doctorRepository.preload({
        id: id,
        hospital: hospital,
        user: user,
        ...doctorDetails
      });

      return await this.doctorRepository.save(doctorUpd);

    }catch(error){
      
      console.log(error);
      throw new InternalServerErrorException(`Check logs server`);

    }

  }

  async remove(id: number){

    const doctor = await this.findOne(id);

    // if(!doctor){
    //   throw new BadRequestException(`Doctor: ${id} not found.`);
    // }
    if(doctor.length === 0){
      throw new BadRequestException(`Doctor: ${id} not found.`);
    }
    
    try{

      return this.doctorRepository.remove(doctor);
      
    }catch(error) {
      
      console.log(error);
      throw new InternalServerErrorException(`Check logs server`);

    }

  }
}
