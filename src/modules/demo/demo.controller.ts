import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
import { createReadStream, statSync } from 'fs';
import { join } from 'path';
import * as mime from 'mime';
import { Throttle } from 'stream-throttle';

@Controller('demo')
export class DemoController {
  constructor() {}

  @Get()
  Demo() {
    return 'Demo Route Works';
  }

  @Get('image')
  getImage(@Res() res: Response) {
    const filePath = join(process.cwd(), 'public', 'images', 'halo.jpg');
    const stats = statSync(filePath);
    const image = createReadStream(filePath);
    const throttle = new Throttle({
      rate: 100 * 5000,
    });
    res.set({
      'Content-Type': mime.getType(filePath) || 'image/jpeg',
      'Content-Length': stats.size,
      'Cache-Control': 'public, max-age=3600', // optional caching header
    });
    image.pipe(throttle).pipe(res);
  }

}
