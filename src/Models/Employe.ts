import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employe {

    constructor(Nom: String, Prenom: String) {
        this.Nom = Nom;
        this.Prenom = Prenom;
    }

    @PrimaryGeneratedColumn()
    Id: number;
    @Column()
    Nom: String;
    @Column()
    Prenom: String;
}