import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query, ParseIntPipe, Res } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('doctors')
@UseGuards(AuthGuard)
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post('create-doctor')
  create(@Req() request: Request, @Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(request, createDoctorDto);
  }

  @Get('list-doctors')
  findAll(@Query() paginationDto:PaginationDto) {
    // return this.doctorsService.listDoctors();
    return this.doctorsService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.findOneDoctorBuilder(id);
  }

  @Patch('update-doctor/:id')
  update(@Param('id', ParseIntPipe) id: number, @Req() request: Request, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorsService.update(id, request, updateDoctorDto);
  }

  @Delete('delete-doctor/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.doctorsService.remove(id);
  }
}
