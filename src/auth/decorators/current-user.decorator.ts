import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'aws-sdk/clients/appstream';

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
