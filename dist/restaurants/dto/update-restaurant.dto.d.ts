import { Category } from '../schemas/restaurant.schema';
import { User } from '../../auth/schema/user.schema';
export declare class UpdateRestaurantDto {
    readonly name: string;
    readonly description: string;
    readonly email: string;
    readonly phoneNo: number;
    readonly address: string;
    readonly category: Category;
    readonly user: User;
}
