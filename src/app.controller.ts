import { Controller, Get, Next, Req, Res } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  // @Req() req, @Res() res, @Next() next 직접 쓰는건 안좋음
  home() {
    return 'Welcome to my homepage!';
  }
}
