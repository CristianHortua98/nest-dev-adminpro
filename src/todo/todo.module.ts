import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Hospital } from 'src/hospitals/entities/hospital.entity';

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [
    TypeOrmModule.forFeature([User, Doctor, Hospital]),
    AuthModule
  ]
})
export class TodoModule {



}
