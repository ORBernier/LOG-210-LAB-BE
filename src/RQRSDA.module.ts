import {Module} from '@nestjs/common';
import {EmployesController} from './Controllers/EmployesController';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DependencyInstaller} from './Infrastructure/DependencyInstaller';
import {Employe} from "./Models/Employe";

@Module({
    imports: [TypeOrmModule.forRoot(),
              TypeOrmModule.forFeature([Employe])],
    controllers: [EmployesController],
    components: DependencyInstaller.Installers,

})

export class ApplicationModule {
}
