import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('todo')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':busqueda')
  busqueda(@Param('busqueda') busqueda: string){

    return this.todoService.busqueda(busqueda);

  }

  
  @Get('tipo/:categoria/:busqueda')
  tipoBusqueda(@Param('categoria') categoria: string, @Param('busqueda') busqueda: string){
    
    return this.todoService.tipoBusqueda(categoria, busqueda);

  }

}
