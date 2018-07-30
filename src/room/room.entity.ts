import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Service } from 'service/service.entity';
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

    @JoinColumn()
    @OneToMany(type => Service, service => service.Rooms)
    Services: Service[];
}