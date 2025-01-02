"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schema/user.schema");
const mongoose_2 = require("mongoose");
const bycript = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const apiFeatures_utils_1 = require("../utils/apiFeatures.utils");
let AuthService = class AuthService {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async signUp(signUpDto) {
        const { name, email, password, role } = signUpDto;
        const hashedPassword = await bycript.hash(password, 10);
        try {
            const user = await this.userModel.create({
                name,
                email,
                password: hashedPassword,
                role
            });
            const token = await apiFeatures_utils_1.default.getUserToken(user._id, this.jwtService);
            return token;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException(`Email ${email} already exists`);
            }
            else {
                throw new Error('Something went wrong');
            }
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email }).select('+password');
        if (!user) {
            throw new common_1.UnauthorizedException('email or password is incorrect');
        }
        const checkPassword = await bycript.compare(password, user.password);
        if (!checkPassword) {
            throw new common_1.UnauthorizedException('email or password is incorrect');
        }
        const token = await apiFeatures_utils_1.default.getUserToken(user._id, this.jwtService);
        return token;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map