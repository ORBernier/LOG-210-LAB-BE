export class UpdateRoomDto {

    readonly Id: number;
    readonly Name: string;
    readonly NbPlaces: number;
    readonly ServicePointId: number;
    readonly ServicesIds: number[];
}