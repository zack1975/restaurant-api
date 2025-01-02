/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Restaurant } from './schemas/restaurant.schema';
import { User } from '../auth/schema/user.schema';
export declare class RestaurantsService {
    private restaurantModel;
    constructor(restaurantModel: mongoose.Model<Restaurant>);
    findAll(query: Query): Promise<Restaurant[]>;
    create(restaurant: Restaurant, user: User): Promise<Restaurant>;
    findById(id: string): Promise<Restaurant>;
    updateById(id: string, restaurant: Restaurant): Promise<Restaurant>;
    deleteById(id: string): Promise<Restaurant>;
    uploadImages(id: any, files: any): Promise<any>;
    deleteImages(images: any): Promise<any>;
}
