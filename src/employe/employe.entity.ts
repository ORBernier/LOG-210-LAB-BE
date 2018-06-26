import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employe {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 50})
    FirstName: string;

    @Column({length: 50})
    LastName: string;

    @Column({length: 100})
    Email: string;

    @Column({length: 50})
    Role: string;
}