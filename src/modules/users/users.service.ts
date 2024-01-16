import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import * as bcrypt from 'bcrypt';
import { exceptionHandling } from 'src/common/exceptionHandling';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, fullname: string, phone_number: string): Promise<User> {
    // Verifica si el usuario ya existe
    const existingUser = await this.userRepository.findOne({ where: { email: email} });
    if (existingUser) {
      exceptionHandling(`User with this email already exists.`, {}, 409);
    }

    // Hashea la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    const newUser = this.userRepository.create({ email, password: hashedPassword, fullname, phone_number });
    return await this.userRepository.save(newUser);
  }

  async validateUser(email: string, password: string): Promise<User | void> {

    try{
       // Busca el usuario por su correo electrónico
      const user = await this.userRepository.findOneOrFail({ 
        where: { 
          email: email
        } 
      });

      // Verifica si el usuario existe
      if (user) {
        // Compara la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (isPasswordValid) {
          return user;
        }
      }
    }catch(error){
      return exceptionHandling(`Authentication failed.`, error);
    }
  }

  async findById(id: string): Promise<User | null> {
    // Busca un usuario por su ID
    return this.userRepository.findOne({ where: { id: id} });
  }
}
