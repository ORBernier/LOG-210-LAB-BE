export class UpdatePricingDto {

    readonly Id: number;
    readonly ParentsPrincing: number;
    readonly IsSubventioned: boolean;
    readonly CISSSPricing: number;
    readonly StartDate: Date;
    readonly ServiceId: number;
}