export class CreateRoomDto {

    readonly Name: string;
    readonly NbPlaces: number;
    readonly ServicePointId: number;
    readonly ServicesIds: number[];
}