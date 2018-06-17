import { Entity } from 'typeorm';
import { Employe } from './Employe';

@Entity()
export class Intervenant extends Employe {

    constructor(Nom: String, Prenom: String) {
        super(Nom, Prenom);
    }
}