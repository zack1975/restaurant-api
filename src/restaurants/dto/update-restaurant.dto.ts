import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Category } from '../schemas/restaurant.schema';
export class UpdateRestaurantDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description: string;

  @IsEmail({}, { message: 'Please enter a valid email address' })
  @IsOptional()
  readonly email: string;

  @IsPhoneNumber()
  @IsOptional()
  readonly phoneNo: number;

  @IsString()
  @IsOptional()
  readonly address: string;

  @IsEnum(Category, { message: 'Please enter a valid category' })
  @IsOptional()
  readonly category: Category;
}
