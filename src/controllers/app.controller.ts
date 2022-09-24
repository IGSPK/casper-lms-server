import { ConfigService } from '@nestjs/config';
import { Controller, Get, Param, Res } from '@nestjs/common';
@Controller('')
export class AppController {
  constructor(private configService: ConfigService) { }
  @Get()
  get() {
    console.log(this.configService.get<string>('DATABASE'))
    return "Server is running";
  }
  // this is to serve storage files
  @Get('storage/:file')
  storage(@Param('file') file, @Res() res) {
    return res.sendFile(file, { root: 'storage' });
  }

  @Get('test')
  test() {
    return 'gpood'
  }
}
