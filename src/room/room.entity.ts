import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Service } from 'service/service.entity';

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 50})
    Name: string;

    @Column()
    NbPlaces: number;

    @ManyToMany(type => Service, service => service.Rooms)
    Services: Service[];
}