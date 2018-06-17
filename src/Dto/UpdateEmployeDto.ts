import {Employe} from "../Models/Employe";

export class UpdateEmployeDto {
    readonly Id: number;
    readonly Nom: string;
    readonly Prenom: string;

    public ToEmploye() : Employe {
        const employe = new Employe(this.Nom, this.Prenom);

        return employe;
    }
}