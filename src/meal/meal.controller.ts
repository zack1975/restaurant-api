import { Controller, Post, Body, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { MealService } from './meal.service';
import { CreateMealDto } from './dto/create-meal.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Meal } from './schemas/meal.schema';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateMealDto } from './dto/update-meal.dto';

@Controller('meals')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get()
  async getAllMeals(): Promise<Meal[]> {
    return this.mealService.findAll();
  }

  @Get('restaurant/:id')
  async getMealsByRestaurant(@Param('id') id: string): Promise<Meal[]> {
    return this.mealService.findByRestaurant(id);
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin', 'user')
  async createMeal(
    @Body() createMealDto: CreateMealDto,
    @CurrentUser() user,
  ): Promise<Meal> {
    return this.mealService.create(createMealDto, user);
  }

  @Get(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin', 'user')
  async getMealById(@Param('id') id: string): Promise<Meal> {
    return this.mealService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin', 'user')
  async updateMeal(
    @Param('id') id: string,
    @Body() updateMealDto: UpdateMealDto,
    @CurrentUser() user
  ): Promise<Meal> {
    const data = Object.assign(updateMealDto, { user: user._id });
    return this.mealService.updateById(id, data);
}

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin', 'user')
  async deleteMealById(@Param('id') id: string): Promise<{ deleted: boolean }> {
    return this.mealService.deleteMeal(id);
}


}
