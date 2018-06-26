import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './jwt-payload.interface';
import { EmployesService } from 'employe/employes.service';

@Injectable()
export class AuthService {
  constructor(private readonly employesService: EmployesService) {}

  async createToken() {
    const user: JwtPayload = { email: 'user@email.com' };
    return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.employesService.findOneByEmail(payload.email);
  }
}