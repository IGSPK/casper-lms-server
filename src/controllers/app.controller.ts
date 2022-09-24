import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller()
export class AppController {
  // this is to serve storage files
  @Get('storage/:file')
  get(@Param('file') file, @Res() res) {
    return res.sendFile(file, { root: 'storage' });
  }
}
