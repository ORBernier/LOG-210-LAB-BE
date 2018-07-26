import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from 'organization/organization.entity';

@Entity()
export class ReferentOrganization {

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

    @Column({length: 250})
    WebSite: string;

    @Column()
    IsActive: boolean;

    @ManyToOne(type => Organization)
    Organization: Organization;
}