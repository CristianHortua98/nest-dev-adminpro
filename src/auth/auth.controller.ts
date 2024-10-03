import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService){}

  // @UseGuards(AuthGuard)
  @Post('create-user')
  createUser(@Body() createUserDto:CreateUserDto){
    return this.authService.createUser(createUserDto);
  }


  @UseGuards(AuthGuard)
  @Get('users')
  findAll() {
    return this.authService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get('users/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch('update-user/:id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto:UpdateUserDto){
    return this.authService.updateUser(id, updateUserDto);
  }
  

  @UseGuards(AuthGuard)
  @Delete('delete-user/:id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.authService.desactiveUser(id);
    // return this.authService.deleteUser(id);
  }

  @Post('signin')
  signIn(@Body() signInUserDto:SignInUserDto){
    return this.authService.signIn(signInUserDto);
  }
}
