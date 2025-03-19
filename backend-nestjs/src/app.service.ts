import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      status: false,
      message: 'API is in /api/v1/series',
    }
  }
}
