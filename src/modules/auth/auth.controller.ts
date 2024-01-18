import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() login: SignupDto){
     return await this.authService.signUp(login.email, login.password, login.fullname, login.phone_number); 
  }

  @Post('login')
  async signIn(@Body() body: LoginDto){
    return await this.authService.signIn(body.email, body.password);
  }
}