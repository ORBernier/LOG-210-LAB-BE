import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { User } from "user/user.entity";
import { Adress } from "adress/adress.entity";

@Entity()
export class Employee {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 50})
    FirstName: string;

    @Column({length: 50})
    LastName: string;

    @Column({length: 25})
    Phone: string;

    @Column({length: 50})
    RoleOrganization: string;

    @OneToOne(type => User)
    UserAccount: User;

    @OneToOne(type => Adress)
    Adress: Adress;
}
