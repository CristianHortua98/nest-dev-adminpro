import { Module } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { HospitalsController } from './hospitals.controller';
import { Hospital } from './entities/hospital.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Hospital]),
    AuthModule
  ],
  controllers: [HospitalsController],
  providers: [HospitalsService],
  exports: [HospitalsService]
})
export class HospitalsModule {}
