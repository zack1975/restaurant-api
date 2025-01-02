import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsEmpty,
} from 'class-validator';
import { Category } from '../schemas/restaurant.schema';
import { User } from '../../auth/schema/user.schema';
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

  @IsEmpty({ message: 'You cannot provide User ID' })
  readonly user: User;
}
