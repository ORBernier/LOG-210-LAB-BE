import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { ServicePoint } from 'servicePoint/servicePoint.entity';
import { Room } from 'room/room.entity';

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

    @ManyToMany(type => Room, room => room.Services)
    Rooms: Room[];

}