/* eslint-disable no-unused-vars */
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { exceptionHandler } from 'src/common/exception.handler';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public jwt: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    return this.validateRequest(authorization);
  }

  validateRequest(authorization: string) {
    try {
      return this.jwt.verify(authorization.split(' ')[1]);
    } catch (message) {
      throw exceptionHandler(`Access token expired`, [], 403);
    }
  }
}
