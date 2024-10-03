import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DoctorsModule } from './doctors/doctors.module';
import { HospitalsModule } from './hospitals/hospitals.module';
import { CommonModule } from './common/common.module';
import { TodoModule } from './todo/todo.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true // SOLO USAR EN DESARROLLO
    }),
    AuthModule,
    DoctorsModule,
    HospitalsModule,
    CommonModule,
    TodoModule,
    UploadsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
