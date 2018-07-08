import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Room {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column()
    NbPlaces: number;
}