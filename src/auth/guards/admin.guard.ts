import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService:AuthService
  ){}


  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest();
    // console.log(request);
    // console.log(request.params.id);
    // console.log(request.user);
    // console.log(request.user.id);

    const idUserParam = request.params.id;
    const idUser = request.user.id

    if(!idUser){
      throw new UnauthorizedException(`User does not exists`);
    }

    const user = await this.authService.findOne(idUser);
    if(!user){
      throw new UnauthorizedException(`User does not exists`);
    }

    //SI EL USUARIO SE ACTUALIZA ASI MISMO O TIENE EL ROL ADMIN

    if(user.role === 'ADMIN_ROLE' || user.id === Number(idUserParam)){

      return true;

    }else{
      throw new UnauthorizedException(`Does not have the permitted role`);
    }


  }
}
