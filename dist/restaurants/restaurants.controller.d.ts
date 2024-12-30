import { Query as ExpressQuery } from 'express-serve-static-core';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
export declare class RestaurantsController {
    private restaurantsService;
    constructor(restaurantsService: RestaurantsService);
    getAllRestaurants(query: ExpressQuery): Promise<Restaurant[]>;
    createRestaurant(restaurant: CreateRestaurantDto): Promise<Restaurant>;
    getRestaurantById(id: string): Promise<Restaurant>;
    updateRestaurant(id: string, restaurant: UpdateRestaurantDto): Promise<Restaurant>;
    deleteRestaurant(id: string): Promise<{
        deleted: boolean;
    }>;
}
