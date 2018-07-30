import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Adress } from "adress/adress.entity";
import { Organization } from "organization/organization.entity";

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

    @JoinColumn()
    @OneToOne(type => Adress)
    Adress: Adress;

    @ManyToOne(type => Organization)
    Organization: Organization;
}
