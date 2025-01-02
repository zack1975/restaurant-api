"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = require("mongoose");
const restaurant_schema_1 = require("./schemas/restaurant.schema");
const apiFeatures_utils_1 = require("../utils/apiFeatures.utils");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantModel) {
        this.restaurantModel = restaurantModel;
    }
    async findAll(query) {
        const keyword = query.keyword
            ? {
                name: {
                    $regex: query.keyword,
                    $options: 'i',
                },
            }
            : {};
        const itemsPerPage = 3;
        const currentPage = Number(query.page) || 1;
        const skip = (currentPage - 1) * itemsPerPage;
        const restaurants = await this.restaurantModel
            .find({ ...keyword })
            .limit(itemsPerPage)
            .skip(skip);
        return restaurants;
    }
    async create(restaurant, user) {
        const location = await apiFeatures_utils_1.default.getAddressLocation(restaurant.address);
        const data = Object.assign(restaurant, { user: user._id, location });
        const newRestaurant = await this.restaurantModel.create(data);
        return newRestaurant;
    }
    async findById(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new common_1.NotFoundException('Invalid ID format, please enter a valid ID');
        }
        const restaurant = await this.restaurantModel.findById(id);
        if (!restaurant) {
            throw new common_1.NotFoundException('Restaurant not found');
        }
        return restaurant;
    }
    async updateById(id, restaurant) {
        if (!mongoose.isValidObjectId(id)) {
            throw new common_1.NotFoundException('Invalid ID format, please enter a valid ID');
        }
        return await this.restaurantModel.findByIdAndUpdate(id, restaurant, {
            new: true,
            runValidators: true,
        });
    }
    async deleteById(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new common_1.NotFoundException('Invalid ID format, please enter a valid ID');
        }
        return await this.restaurantModel.findByIdAndDelete(id);
    }
    async uploadImages(id, files) {
        const images = await apiFeatures_utils_1.default.uploadFiles(files);
        const restaurant = await this.restaurantModel.findByIdAndUpdate(id, {
            images: images,
        }, {
            new: true,
            runValidators: true,
        });
        return restaurant;
    }
    async deleteImages(images) {
        if (images.length === 0) {
            return true;
        }
        const res = await apiFeatures_utils_1.default.deleteFiles(images);
        return res;
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(restaurant_schema_1.Restaurant.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], RestaurantsService);
//# sourceMappingURL=restaurants.service.js.map