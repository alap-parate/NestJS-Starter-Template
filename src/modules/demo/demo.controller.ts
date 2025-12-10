import { Controller, Get } from '@nestjs/common';

@Controller('demo')
export class DemoController {
  constructor() {}

  @Get()
  Demo() {
    return 'Demo Route Works';
  }

}
