import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
export declare class RestaurantsController {
    private restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    getAllRestaurants(): Promise<Restaurant[]>;
}
