import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Service {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column()
    IsActive: boolean;
}