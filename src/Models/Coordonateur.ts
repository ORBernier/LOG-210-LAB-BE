import { Entity } from 'typeorm';
import { AdjointCoordonateur } from './AdjointCoordonateur';

@Entity()
export class Coordonateur extends AdjointCoordonateur {

    constructor(Nom: String, Prenom: String) {
        super(Nom, Prenom);
    }

    creerUsager(nom: String, prenom: String, role: String) {
        
        if(role == 'Intervenant') {

        }
        if(role == 'AdjointCoordonateur') {

        }
        if(role == 'Coordonateur') {

        }
        if(role == 'Directeur') {
            
        }
    }
}