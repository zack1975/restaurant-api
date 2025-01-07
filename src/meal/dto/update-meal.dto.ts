import {
  IsEmpty,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../auth/schema/user.schema';
import { Category } from '../schemas/meal.schema';

export class UpdateMealDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsEnum(Category, { message: 'Please enter a valid category for this meal' })
  readonly category: Category;

  @IsOptional()
  @IsString()
  readonly restaurant: string;

  @IsEmpty({ message: 'You cannot provide a userId' })
  readonly user: User;
}
