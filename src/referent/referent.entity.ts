import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ReferentOrganization } from 'referentOrganization/referentOrganization.entity';

@Entity()
export class Referent {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column({length: 100})
    Name: string;

    @Column({length: 50})
    Title: string;

    @Column({length: 25})
    CellularPhone: string;

    @Column({length: 25})
    Phone: string;

    @Column({length: 100})
    Email: string;

    @Column({length: 25})
    Fax: string;

    @Column()
    IsPaper: boolean;

    @Column()
    IsEmail: boolean;

    @Column()
    IsFax: boolean;

    @ManyToOne(type => ReferentOrganization)
    ReferentOrganization: ReferentOrganization;
}