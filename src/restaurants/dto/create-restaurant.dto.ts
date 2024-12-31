import { 
  IsEmail,
  IsEnum, 
  IsNotEmpty, 
  IsPhoneNumber, 
  IsString 
} from 'class-validator';
import { Category } from '../schemas/restaurant.schema';
export class CreateRestaurantDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter a valid email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNo: number;

  @IsNotEmpty()
  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter a valid category' })
  readonly category: Category;
}