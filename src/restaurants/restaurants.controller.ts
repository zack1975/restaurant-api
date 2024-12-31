import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private restaurantsService: RestaurantsService) {}

  @Get()
  async getAllRestaurants(@Query() query: ExpressQuery): Promise<Restaurant[]>{
    return this.restaurantsService.findAll(query);
  }

  @Post()
  async createRestaurant(
    @Body()
    restaurant: CreateRestaurantDto
  ): Promise<Restaurant> {
    return this.restaurantsService.create(restaurant);
  }

  @Get(':id')
  async getRestaurantById(
    @Param('id')
    id: string
  ): Promise<Restaurant> {
    return this.restaurantsService.findById(id);
  }

  @Put(':id')
  async updateRestaurant(
    @Param('id')
    id: string,
    @Body()
    restaurant: UpdateRestaurantDto
  ): Promise<Restaurant> {
    await this.restaurantsService.findById(id);
    return this.restaurantsService.updateById(id, restaurant);
  }

  @Delete(':id')
  async deleteRestaurant(
    @Param('id')
    id: string
  ): Promise<{ deleted: boolean }> {
    const restaurant = await this.restaurantsService.findById(id);
    const deleteImages = await this.restaurantsService.deleteImages(
      restaurant.images,
    );
    if (deleteImages) {
      await this.restaurantsService.deleteById(id);
      return { deleted: true };
    } else {
      return { deleted: false };
    }
  }

  @Put('upload/:id')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFiles(
    @Param('id')
    id: string,
    @UploadedFiles() files: Array<Express.Multer.File>
  ) {
    await this.restaurantsService.findById(id);
    const res = await this.restaurantsService.uploadImages(id, files);

    return res;
  }
}
