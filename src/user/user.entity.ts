import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

    @PrimaryColumn({length: 100})
    Email: string;

    @Column({length: 50})
    Role: string;
}