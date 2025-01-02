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
import { User } from '../../auth/schema/user.schema';
import mongoose from 'mongoose';
export declare class Location {
    type: string;
    coordinates: number[];
    formattedAddress: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
}
export declare enum Category {
    FAST_FOOD = "Fast food",
    CAFE = "Cafe",
    FINE_DINNING = "Fine Dinning"
}
export declare class Restaurant {
    name: string;
    description: string;
    email: string;
    phoneNo: number;
    address: string;
    category: Category;
    images?: object[];
    location?: Location;
    user: User;
}
export declare const RestaurantSchema: mongoose.Schema<Restaurant, mongoose.Model<Restaurant, any, any, any, mongoose.Document<unknown, any, Restaurant> & Restaurant & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Restaurant, mongoose.Document<unknown, {}, mongoose.FlatRecord<Restaurant>> & mongoose.FlatRecord<Restaurant> & {
    _id: mongoose.Types.ObjectId;
}>;
