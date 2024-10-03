import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { AuthModule } from 'src/auth/auth.module';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Hospital } from 'src/hospitals/entities/hospital.entity';
import { User } from 'src/auth/entities/user.entity';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService],
  imports: [
    TypeOrmModule.forFeature([User, Doctor, Hospital]),
    AuthModule
  ]
})
export class UploadsModule {}
