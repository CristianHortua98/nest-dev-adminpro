import { User } from '../entities/user.entity';
import { MenuItem } from './menu-item.interface';


export interface SignInResponse{

    user: User;
    token: string;
    menu: MenuItem[];

}