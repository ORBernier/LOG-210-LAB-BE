import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Adress {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    DoorNumber: number;

    @Column({length: 100})
    Street: string;

    @Column({length: 50})
    City: string;

    @Column({length: 100})
    Province: string;

    @Column({length: 6})
    PostalCode: string;
}