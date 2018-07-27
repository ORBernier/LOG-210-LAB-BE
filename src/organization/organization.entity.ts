import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { User } from 'user/user.entity';
import { Adress } from 'adress/adress.entity';

@Entity()
export class Organization {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 250})
    Name: string;

    @OneToOne(type => Adress)
    Adress: Adress;

    @Column({length: 25})
    Phone: string;

    @Column({length: 100})
    Email: string;

    @Column({length: 25})
    Fax: string;

    @ManyToOne(type => User)
    Manager: User;
}