import { Entity } from 'typeorm';
import { Intervenant } from './Intervenant';

@Entity()
export class AdjointCoordonateur extends Intervenant {

    constructor(Nom: String, Prenom: String) {
        super(Nom, Prenom);
    }
}