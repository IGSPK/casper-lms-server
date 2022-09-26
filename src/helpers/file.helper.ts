import { ParseFilePipeBuilder } from '@nestjs/common';
import { Request } from 'express';

export const imageParseFilePipeBuilder = new ParseFilePipeBuilder()
  .addFileTypeValidator({
    fileType: RegExp(/\/(jpg|jpeg|png|gif)$/),
  })
  .build({
    fileIsRequired: true,
  });

const makePath = (
  disk: string,
  folder: string,
  file: Express.Multer.File,
  req: Request,
) => {
  const fileName = `${Date.now()}.${file.mimetype.split('/')[1]}`;
  const store = `${disk}/${folder}/${fileName}`;
  return {
    store,
    serve:
      `${req.protocol}://${req.get('Host')}` +
      (process.env.ENVIRONMENT === 'Development' ? `` : `/${disk}`) +
      `/${folder}/${fileName}`,
  };
};
export const makePublicPath = (
  folder: string,
  file: Express.Multer.File,
  req: Request,
) => makePath('public', folder, file, req);
