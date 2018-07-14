import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { OrganizationsModule} from 'organization/organizations.module'
import { UsersModule } from 'user/users.module';
import { ServicePointsModule } from 'servicePoint/servicePoints.module';
import { ServicesModule } from 'service/services.module';
import { RoomsModule } from 'room/rooms.module';
import { PricingsModule } from 'pricing/pricings.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, OrganizationsModule,
    ServicePointsModule, ServicesModule, RoomsModule, PricingsModule],
  controllers: [AppController],
  providers: [AppService], 
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}