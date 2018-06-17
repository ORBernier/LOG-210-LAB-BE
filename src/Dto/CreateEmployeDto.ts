import {Employe} from "../Models/Employe";

export class CreateEmployeDto {
    readonly Nom: string;
    readonly Prenom: string;
    readonly Role: string;

    public ToEmploye() : Employe {
        const employe = new Employe();
        employe.Nom = this.Nom;
        employe.Prenom = this.Prenom;
        employe.Role = this.Role;

        return employe;
    }
}