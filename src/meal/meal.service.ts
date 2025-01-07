import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Meal } from './schemas/meal.schema';
import * as mongoose from 'mongoose';
import { Restaurant } from '../restaurants/schemas/restaurant.schema';
import { User } from '../auth/schema/user.schema';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name) 
    private mealModel: mongoose.Model<Meal>,
    @InjectModel(Restaurant.name) 
    private restaurantModel: mongoose.Model<Restaurant>,
  ) {}


  async findAll(): Promise<Meal[]> {
    const meals = await this.mealModel.find();
    return meals;
  }

  async findByRestaurant(id: string): Promise<Meal[]> {
    const meals = await this.mealModel.find({ restaurant: id });
    return meals;
  }

  async create(meal: Meal, user: User): Promise<Meal> {

    const data = Object.assign(meal, { user: user._id });

    const newMeal = await this.mealModel.create(data);

    const restaurant = await this.restaurantModel.findById(meal.restaurant);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    if (restaurant.user.toString() !== user._id.toString()) {
      throw new ForbiddenException(
        'You are not allowed to add meal to this restaurant',
      );
    }

    restaurant.menu.push(newMeal._id as any);

    await restaurant.save();

    return newMeal;
  }

  async findById(id: string): Promise<Meal> {

    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(
        'Invalid ID format, please enter a valid ID',
      );
    }

    const meal = await this.mealModel.findById(id);

    if (!meal) {
      throw new NotFoundException('Meal not found');
    }

    return meal;
  }

  async updateById(id: string, meal: Meal): Promise<Meal> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(
        'Invalid ID format, please enter a valid ID',
      );
    }

    return await this.mealModel.findByIdAndUpdate(id, meal, {
      new: true,
      runValidators: true,
    });
  }

  async deleteMeal(id: string): Promise<{ deleted: boolean }> {
    const meal = await this.findById(id);
    const restaurant = await this.restaurantModel.findById(meal.restaurant);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    const deleted = await this.mealModel.findByIdAndDelete(id);

    if (!deleted) {
      return { deleted: false };
    }

    const index = restaurant.menu.indexOf(id as any);

    if (index > -1) {
      restaurant.menu.splice(index, 1);
    }

    await restaurant.save();


    return { deleted: true };
  }
}
