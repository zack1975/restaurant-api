import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bycript from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import APIFeatures from 'src/utils/apiFeatures.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService 
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {

    const { name, email, password, role } = signUpDto;
    const hashedPassword = await bycript.hash(password, 10);

    try {
      const user = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role
      });

      const token = await APIFeatures.getUserToken(user._id, this.jwtService);

      return token;

    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(`Email ${email} already exists`);
      } else {
        throw new Error('Something went wrong');
      }
    }
  }
  

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    const checkPassword = await bycript.compare(password, user.password);
    if (!checkPassword) {
      throw new UnauthorizedException('email or password is incorrect');
    }

    const token = await APIFeatures.getUserToken(user._id, this.jwtService);

    return token;
  }
}
