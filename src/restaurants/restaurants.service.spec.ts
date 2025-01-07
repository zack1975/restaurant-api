import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { getModelToken } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { Model } from 'mongoose';
import { UserRoles } from '../auth/schema/user.schema';
import APIFeatures from '../utils/apiFeatures.utils';

const mockRestaurantService = {
  find: jest.fn(),
  create: jest.fn(),
};

const mockUser = {
  _id: '677c070019ec77d3bc49f66a',
  name: 'Andrea',
  email: 'andrea.zucca3@loqusgroup.com',
  password: '1234567',
  role: UserRoles.ADMIN,
};

const mockRestaurant = {
  _id: '677c072119ec77d3bc49f66e',
  name: 'Restaurant 14',
  description: 'the 14th restaurant',
  email: 'restaurant14@nestjscourserestaurant.com',
  phoneNo: 123456789,
  address: 'Via Giacomo Puccini, 43 09170 Oristano, IT',
  category: 'Fast food',
  images: [],
  location: {
    type: 'Point',
    coordinates: [8.5939605, 39.9072281],
    formattedAddress: 'Via Giacomo Puccini, 43, 09170 Oristano OR, Italy',
    city: 'Oristano',
    zipcode: '09170',
    country: 'IT',
    state: 'Italy',
  },
  menu: [
    '677c079f18368d45eef30447',
    '677c590f8afe3848aacea644',
    '677c5bce62456a6ba82fee75',
  ],
  user: '677c070019ec77d3bc49f66a'
};

describe('restaurantService', () => {
  let service: RestaurantsService;
  let model: Model<Restaurant>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: getModelToken(Restaurant.name),
          useValue: mockRestaurantService,
        },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    model = module.get<Model<Restaurant>>(getModelToken(Restaurant.name));
  });

  it('Service should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Model should be defined', () => {
    expect(model).toBeDefined();
  });

  describe('findAll', () => {
    it('Return a list of restaurants', async () => {
      jest.spyOn(model, 'find').mockImplementationOnce(
        () =>
          ({
            limit: () => ({
              skip: jest.fn().mockResolvedValue([mockRestaurant]),
            }),
          }) as any,
      );

      const restaurants = await service.findAll({ keyword: 'restaurant' });

      expect(restaurants).toEqual([mockRestaurant]);
    });
  });

  describe('Cretae a new restaurant', () => {

    const newRestaurant = {
      name: 'Restaurant 14',
      description: 'the 14th restaurant',
      email: 'restaurant14@nestjscourserestaurant.com',
      phoneNo: 123456789,
      address: 'Via Giacomo Puccini, 43 09170 Oristano, IT',
      category: 'Fast food',
    };

    it('Should create a new Restaurant', async () => {
      jest
        .spyOn(APIFeatures, 'getAddressLocation')
        .mockImplementationOnce(() => Promise.resolve(mockRestaurant.location));
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce(() => Promise.resolve(mockRestaurant as any));

      const restaurant = await service.create(
        newRestaurant as any,
        mockUser as any,
      );
      expect(restaurant).toEqual(mockRestaurant);
    });
  });
});
