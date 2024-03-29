import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}


  async signUp(email: string, password: string, fullname: string, phone_number: string): Promise<{ token: string }> {

    const user = await this.usersService.create(email, password, fullname, phone_number);

    // Genera y devuelve el token JWT
    return this.generateToken(user.id, user.email);
  }

  async signIn(email: string, password: string): Promise<{ token: string }> {

    try{
      // Implementa la lógica para autenticar al usuario
      const user = await this.usersService.validateUser(email, password);

      // Si la autenticación es exitosa, genera y devuelve el token JWT
      if (user) {
        return this.generateToken(user.id, user.email);
      }
      
    }catch(error){

      return error
    }

  }

  async verifyToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  public generateToken(userId: number, userEmail: string): { token: string } {
    // Genera el token JWT utilizando el JwtService
    const payload = { email: userEmail };
    const token: string = this.jwtService.sign(payload);
    return { token };
  }
}
