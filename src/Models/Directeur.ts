import { Entity } from 'typeorm';
import { Coordonateur } from './Coordonateur';

@Entity()
export class Directeur extends Coordonateur {

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