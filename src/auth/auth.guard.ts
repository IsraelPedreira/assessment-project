import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> | null {
    const request = context.switchToHttp().getRequest();
    const token = this.bearerToken(request.headers.authorization);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get('JWT_SECRET'),
        }
      );
      request['user'] = payload;
      
    } catch {
      throw new UnauthorizedException();
    }
    return true;

  }

  bearerToken(token: string) {
    if (!token) {
      return null;
    }
    return token.split(' ')[1];
  }
}
