import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { Organization } from 'organization/organization.entity';
import { Adress } from 'adress/adress.entity';

@Entity()
export class ReferentOrganization {

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

    @Column({length: 250})
    WebSite: string;

    @Column()
    IsActive: boolean;

    @ManyToOne(type => Organization)
    Organization: Organization;
}