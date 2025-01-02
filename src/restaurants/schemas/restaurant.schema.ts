import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../auth/schema/user.schema';
import mongoose from 'mongoose';

export class Location {
  @Prop({ type: String, enum: ['Point'], default: 'Point' })
  type: string;

  @Prop({ type: '2dsphere' })
  coordinates: number[];

  @Prop({ type: String })
  formattedAddress: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  zipcode: string;

  @Prop({ type: String })
  country: string;
}

export enum Category {
  FAST_FOOD = 'Fast food',
  CAFE = 'Cafe',
  FINE_DINNING = 'Fine Dinning',
}

@Schema()
export class Restaurant {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  email: string;

  @Prop()
  phoneNo: number;

  @Prop()
  address: string;

  @Prop()
  category: Category;

  @Prop()
  images?: object[];

  @Prop({ type: Object, ref: 'Location' })
  location?: Location;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
