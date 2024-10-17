import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { SignInResponse } from './interfaces/signin-response.interfaces';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interfaces';
import { UserCreateReponse } from './interfaces/user-create.response.interface';
import * as request from 'supertest';

@Injectable()
export class AuthService {

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService

  ){}

  async signIn(signInUserDto: SignInUserDto): Promise<SignInResponse>{

    const { username, password } = signInUserDto;

    const infoUser = await this.userRepository.findOne({
      where: {username: username},
      select: { id: true, name: true, username: true, email: true, document: true, password: true, img: true, role: true, is_active: true}
    })
    
    
    if(!infoUser){
      throw new UnauthorizedException(`User: ${username} not exist.`);
    }
    
    //VALIDAR USUARIO ACTIVO
    if(infoUser.is_active !== 1){
      throw new UnauthorizedException(`User: ${username} not activated.`);
    }
    
    //VALIDAR CONTRASEÑA
    if(!bcrypt.compareSync(password, infoUser.password)){
      throw new UnauthorizedException(`Credentials not valid, password incorrect.`);
    }
    
    delete infoUser.password;
    
    return {
      user: infoUser,
      token: this.getJwtToken({
        id: infoUser.id,
        username: infoUser.username
      })
    }


  }

  async checkToken(request: Request): Promise<SignInResponse>{

    const user: User = request['user'];

    const infoUser = await this.userRepository.findOne({
      where: {username: user.username},
      select: { id: true, name: true, username: true, email: true, document: true, img: true, role: true, is_active: true}
    })

    if(!infoUser){
      throw new UnauthorizedException(`User not existe`);
    }

    return {
      user: infoUser,
      token: this.getJwtToken({
        id: user.id,
        username: user.username
      })
    }

  }

  async createUser(createUserDto:CreateUserDto): Promise<UserCreateReponse>{

    try{

      const { password, ...userData } = createUserDto;
      
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      });

      const newUser = await this.userRepository.save(user);
      delete user.password;

      // return newUser;
      return {
        user: newUser,
        token: this.getJwtToken({
          id: newUser.id,
          username: newUser.username
        })
      }

    }catch(error) {

      this.handleDBError(error);
      
    }

  }

  async updateUser(id:number, updateUserDto:UpdateUserDto): Promise<User>{
    //TODO: Validar token si es el usuario correcto

    const user = await this.userRepository.preload({
      id: id,
      ...updateUserDto
    })

    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }

    try{

      const newUser = await this.userRepository.save(user);
      delete newUser.password;

      return newUser;

    }catch(error) {
      
      this.handleDBError(error);

    }

  }

  findAll() {
    return this.userRepository.find({
      where: {is_active: 1},
      select: {id: true, name: true, username: true, email: true, document: true, img: true, role: true, is_active: true}
    });
  }

  async findOne(id: number): Promise<User>{

    const user = await this.userRepository.findOneBy({
      id: id
    })

    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }

    //QUITAR PASSWORD DE LA RESPUESTA
    delete user.password;

    return user;

  }

  async desactiveUser(id:number){

    const user = await this.userRepository.preload({
      id: id,
      is_active: 0
    });

    if(!user){
      throw new NotFoundException(`User with id ${id} not found`);
    }

    try{

      const newUser = await this.userRepository.save(user);
      delete user.password;

      return newUser;
      
    }catch(error){
      
      this.handleDBError(error);

    }

  }

  async deleteUser(id: number) {

    try{

      const user = await this.findOne(id);
      return this.userRepository.remove(user);

    }catch(error){
      
      this.handleDBError(error);
      
    }

  }

  private handleDBError(error: any){

    if(error.sqlState === '23000'){
      throw new BadRequestException(`Email, User or Document already exist`);
    }else{
      console.log(error);
      throw new InternalServerErrorException(`Check Logs Server Errors`);
    }

  }

  getJwtToken(payload: JwtPayload){

    const token = this.jwtService.sign(payload);

    return token;

  }

}
