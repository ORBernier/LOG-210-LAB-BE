import {Employe} from "../Models/Employe";

export class CreateEmployeDto {
    readonly Nom: string;
    readonly Prenom: string;

    public ToEmploye() : Employe {
        const employe = new Employe(this.Nom, this.Prenom);

        return employe;
    }
}