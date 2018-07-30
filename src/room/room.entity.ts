import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ServicePoint } from 'servicePoint/servicePoint.entity';

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 50})
    Name: string;

    @Column()
    NbPlaces: number;

    @ManyToOne(type => ServicePoint)
    ServicePoint: ServicePoint;
}