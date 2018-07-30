import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ServicePoint } from 'servicePoint/servicePoint.entity';

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 100})
    Name: string;

    @Column({length: 500})
    Description: string;

    @Column()
    IsActive: boolean;

    @ManyToOne(type => ServicePoint)
    ServicePoint: ServicePoint;
}