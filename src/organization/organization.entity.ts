import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 250})
    Name: string;

    @Column({length: 250})
    Adress: string;

    @Column({length: 25})
    Phone: string;

    @Column({length: 100})
    Email: string;

    @Column({length: 25})
    Fax: string;
}