import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ParseIntPipe, Query } from '@nestjs/common';
import { HospitalsService } from './hospitals.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('hospitals')
@UseGuards(AuthGuard)
export class HospitalsController {
  constructor(private readonly hospitalsService: HospitalsService) {}

  @Post('create-hospital')
  create(@Req() request: Request, @Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalsService.create(request, createHospitalDto);
  }

  @Get('list-hospitals')
  findAll(@Query() paginationDto:PaginationDto) {
    return this.hospitalsService.findAll(paginationDto);
  }

  @Get('list')
  listHospital(){
    return this.hospitalsService.listHospital();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalsService.findOne(id);
  }

  @Patch('update-hospital/:id')
  update(@Param('id', ParseIntPipe) id: number, @Req() request: Request, @Body() updateHospitalDto: UpdateHospitalDto) {
    return this.hospitalsService.update(id, request, updateHospitalDto);
  }

  @Delete('delete-hospital/:id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hospitalsService.remove(id);
  }
}
