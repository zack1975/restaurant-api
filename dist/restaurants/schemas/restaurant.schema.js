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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantSchema = exports.Restaurant = exports.Category = exports.Location = void 0;
const mongoose_1 = require("@nestjs/mongoose");
class Location {
}
exports.Location = Location;
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: ['Point'], default: 'Point' }),
    __metadata("design:type", String)
], Location.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: '2dsphere' }),
    __metadata("design:type", Array)
], Location.prototype, "coordinates", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Location.prototype, "formattedAddress", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Location.prototype, "city", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Location.prototype, "state", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Location.prototype, "zipcode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Location.prototype, "country", void 0);
var Category;
(function (Category) {
    Category["FAST_FOOD"] = "Fast food";
    Category["CAFE"] = "Cafe";
    Category["FINE_DINNING"] = "Fine Dinning";
})(Category || (exports.Category = Category = {}));
let Restaurant = class Restaurant {
};
exports.Restaurant = Restaurant;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "description", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], Restaurant.prototype, "phoneNo", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Restaurant.prototype, "category", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Array)
], Restaurant.prototype, "images", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object, ref: 'Location' }),
    __metadata("design:type", Location)
], Restaurant.prototype, "location", void 0);
exports.Restaurant = Restaurant = __decorate([
    (0, mongoose_1.Schema)()
], Restaurant);
exports.RestaurantSchema = mongoose_1.SchemaFactory.createForClass(Restaurant);
//# sourceMappingURL=restaurant.schema.js.map