import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Service } from 'service/service.entity';

@Entity()
export class Pricing {

    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    ParentsPrincing: number;

    @Column()
    IsSubventioned: boolean;

    @Column()
    CISSSPricing: number;

    @Column()
    StartDate: Date;

    @ManyToOne(type => Service)
    Service: Service;
}