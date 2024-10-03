

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    // console.log(req);
    // console.log(req['params']);

    const {type, id} = req['params'];

    if(!file){

        return callback(new Error('File is empty'), false);

    }

    const fileExtension = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png'];

    if(!validExtensions.includes(fileExtension)){
        return callback(null, false);
    }

    const typesValid = ['hospitals', 'doctors', 'users'];

    if(!typesValid.includes(type)){
        return callback(null, false);
    }



    callback(null, true);

}