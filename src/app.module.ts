import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployesModule } from 'employe/employes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AuthModule } from 'auth/auth.module';
import { OrganizationsModule} from 'organization/organizations.module'

@Module({
  imports: [TypeOrmModule.forRoot(),EmployesModule, OrganizationsModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
