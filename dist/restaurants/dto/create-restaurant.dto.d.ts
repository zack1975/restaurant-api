import { Category } from '../schemas/restaurant.schema';
export declare class CreateRestaurantDto {
    readonly name: string;
    readonly description: string;
    readonly email: string;
    readonly phoneNo: number;
    readonly address: string;
    readonly category: Category;
}
