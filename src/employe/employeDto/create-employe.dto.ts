import { Employe } from "../employe.entity";

export class CreateEmployeDto {
    
    readonly FirstName: string;
    readonly LastName: string;
    readonly Email: string;
    readonly Role: string;

    public toEmploye(): Employe {

        const employe = new Employe();

        employe.FirstName = this.FirstName;
        employe.LastName = this.LastName;
        employe.Email = this.FirstName + this.LastName + "@RQRSDA.qc.ca";
        employe.Role = this.Role;

        return employe;
    }
}