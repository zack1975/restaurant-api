import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
import { Restaurant } from './schemas/restaurant.schema';
import APIFeatures from '../utils/apiFeatures.utils';

@Injectable()
export class RestaurantsService {
  constructor (
    @InjectModel(Restaurant.name)
    private restaurantModel: mongoose.Model<Restaurant>
  ){}

  async findAll(query: Query): Promise<Restaurant[]> {
    const keyword = query.keyword
      ? {
          name: {
            $regex: query.keyword,
            $options: 'i'
          }
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

  async create(restaurant: Restaurant): Promise<Restaurant> {
    const location = await APIFeatures.getAddressLocation(restaurant.address);
    const data = Object.assign(restaurant, { location });
    const newRestaurant = await this.restaurantModel.create(data); 
    return newRestaurant;
  }

  async findById(id: string): Promise<Restaurant> {

    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID format, please enter a valid ID');
    }

    const restaurant = await this.restaurantModel.findById(id);

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found');
    }

    return restaurant;
  }

  async updateById(id: string, restaurant: Restaurant): Promise<Restaurant> {

    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID format, please enter a valid ID');
    }

    return await this.restaurantModel.findByIdAndUpdate(id, restaurant, { 
      new: true,
      runValidators: true
    });
  }

  async deleteById(id: string): Promise<Restaurant> {

    if (!mongoose.isValidObjectId(id)) {
      throw new NotFoundException('Invalid ID format, please enter a valid ID');
    }

    return await this.restaurantModel.findByIdAndDelete(id);
  }

  async uploadImages(id, files): Promise<any> {
    const images = await APIFeatures.uploadFiles(files);

    const restaurant = await this.restaurantModel.findByIdAndUpdate(
      id,
      {
        images: images as Object[],
      },{
        new: true,
        runValidators: true,
      });

    return restaurant;
  }

  async deleteImages(images): Promise<any> {
    if (images.length === 0) {
      return true;
    }
    const res = await APIFeatures.deleteFiles(images);
    return res;
  }
}
