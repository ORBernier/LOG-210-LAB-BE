import {IRQRSDARepository} from './IRQRSDARepository';
import {Employe} from '../Models/Employe';

export interface IRQRSDARepository {

    FindAll(): Promise<Employe[]>;

    Find(nom: string): Promise<Employe>;

    Where(employe: Employe): Promise<Employe>;

    Insert(employe: Employe): Promise<Employe> ;

    Update(id: number, employe: Employe): Promise<Employe>;

    Delete(id: number): Promise<Employe>;
}