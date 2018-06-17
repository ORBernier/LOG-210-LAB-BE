import {RQRSDARepository} from "../Services/RQRSDARepository";

export class DependencyInstaller {

    public static Installers: Array<object> = [
        RQRSDARepository
    ];
};