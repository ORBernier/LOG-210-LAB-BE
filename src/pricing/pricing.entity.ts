import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pricing {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column()
    IsActive: boolean;
}