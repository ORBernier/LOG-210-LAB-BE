import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employe {

    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    Nom: String;
    @Column()
    Prenom: String;
    @Column()
    Role: String;
}