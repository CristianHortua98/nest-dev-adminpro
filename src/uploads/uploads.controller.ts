import { Controller, Param, Put, UploadedFile, UseGuards, ParseIntPipe, BadRequestException, UseInterceptors, Post, Res, Get } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { fileFilter } from './helpers/fileFilter.helper';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { fileNamer } from './helpers/fileNamer.helper';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Controller('upload')
// @UseGuards(AuthGuard)
export class UploadsController {

  constructor(
    private readonly uploadsService: UploadsService,
    private readonly configService: ConfigService
  ) {}

  @Get(':type/:fileName')
  findFile(@Res() res: Response, @Param('type') type: string, @Param('fileName') fileName: string){

    const path = this.uploadsService.getStaticFile(type, fileName);

    //ENVIAMOS EL ARCHIVO COMO RESPUESTA
    res.sendFile(path);
    
  }

  @UseGuards(AuthGuard)  
  @Put(':type/:id')
  // @UseInterceptors(FileInterceptor('file'))
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: (req, file, cb) => {
        const { type } = req.params;
        const uploadPath = path.resolve(__dirname, `../../../archivos-admin-pro/uploads/${type}`);

        cb(null, uploadPath);
      },
      filename: fileNamer
    })
  }))
  fileUpload(@Param('type') type: string, @Param('id', ParseIntPipe) id: number,  @UploadedFile() file: Express.Multer.File){

    if(!file){
      throw new BadRequestException('Make sure that the file is an image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/upload/${type}/${file.filename};`

    return this.uploadsService.updateFile(type, id, secureUrl, file.filename);
    
  }

}
