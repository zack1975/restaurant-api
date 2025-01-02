import { JwtService } from '@nestjs/jwt';
import { Location } from '../restaurants/schemas/restaurant.schema';
export default class APIFeatures {
    static getAddressLocation(address: string): Promise<Location>;
    static uploadFiles(files: any): Promise<unknown>;
    static deleteFiles(files: any): Promise<unknown>;
    static getUserToken(userId: string, jwtService: JwtService): Promise<{
        token: string;
    }>;
}
