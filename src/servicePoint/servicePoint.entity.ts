import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from 'organization/organization.entity';
import { Adress } from 'adress/adress.entity';

@Entity()
export class ServicePoint {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 250})
    Name: string;

    @Column()
    Adress: Adress;

    @Column({length: 25})
    Phone: string;

    @Column({length: 100})
    Email: string;

    @Column({length: 25})
    Fax: string;

    @ManyToOne(type => Organization)
    Organization: Organization;
}