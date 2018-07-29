import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { OrganizationsModule} from 'organization/organizations.module'
import { UsersModule } from 'user/users.module';
import { ServicePointsModule } from 'servicePoint/servicePoints.module';
import { ServicesModule } from 'service/services.module';
import { RoomsModule } from 'room/rooms.module';
import { PricingsModule } from 'pricing/pricings.module';
import { ReferentOrganizationsModule } from 'referentOrganization/referentOrganizations.module';
import { ReferentsModule } from 'referent/referents.module';
import { EmployeesModule } from 'employee/employees.module';
import { AdressesModule } from 'adress/adresses.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UsersModule, OrganizationsModule,
    ServicePointsModule, ServicesModule, RoomsModule, PricingsModule, 
    ReferentOrganizationsModule, ReferentsModule, EmployeesModule, AdressesModule],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}