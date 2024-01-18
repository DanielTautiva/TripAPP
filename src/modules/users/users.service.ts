import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entitys/users.entity';
import * as bcrypt from 'bcrypt';
import { exceptionHandler } from 'src/common/exception.handler';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(email: string, password: string, fullname: string, phone_number: string): Promise<User> {
    
    // Verifica si el usuario ya existe
    let existingUser = await this.userRepository.findOne({ 
      where: { 
        email,
        phone_number
      },
   
    });
    
    if (existingUser) {
      exceptionHandler(`User with this email already exists.`, [], 409);
    }

    // Verifica si el pjone number ya existe
    existingUser = await this.userRepository.findOne({ 
      where: { 
        phone_number
      },
    });

    if (existingUser) {
      exceptionHandler(`User with same phone number already exists.`, [], 409);
    }

    // Hashea la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuevo usuario
    try {
      const newUser = this.userRepository.create({ email, password: hashedPassword, fullname, phone_number });
   
      return await this.userRepository.save(newUser);

    } catch (error) {

      exceptionHandler(`Error at create user.`, error, 500);
    }

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
      return exceptionHandler(`Authentication failed.`, error);
    }
  }

  async findDrivers(): Promise<User[]> {

    const drivers = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'rolesByUser')
      .innerJoin('rolesByUser.role', 'role')
      .where('role.name = :roleName', { roleName: 'driver' })
    .getMany();

    return drivers;
  }

  async findById(id: number): Promise<User | null> {
    // Busca un usuario por su ID
    let user = this.userRepository.findOne({ where: { id: id} });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;

  }

  async findByEmail(email: string): Promise<User | null> {
    // Busca el usuario por su correo electrónico
    const user = await this.userRepository.findOneOrFail({ 
      where: { 
        email: email
      } 
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;

  }
}
