import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  root(): string {
    return 'Hello World! This is the Team 3 from LOG210-02 @ETS/E18';
  }
}