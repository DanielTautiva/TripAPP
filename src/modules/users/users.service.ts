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

  /**
   * Creates a new user with the provided information.
   * @param email User's email.
   * @param password User's password.
   * @param fullname User's full name.
   * @param phone_number User's phone number.
   * @returns Created user.
   * @throws ConflictException if the user already exists (by email or phone number).
   * @throws exceptionHandler if an unexpected error occurs while creating the user.
   */
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

  /**
   * Validates a user's credentials for authentication.
   * @param email User's email.
   * @param password User's password.
   * @returns Validated user or undefined if authentication fails.
   * @throws exceptionHandler if an unexpected error occurs while authenticating the user.
   */
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

      exceptionHandler(`Password incorrect.`, {}, 400);

    }catch(error){
       exceptionHandler(`Authentication failed.`, error);
    }
  }

   /**
   * Finds and returns all users with the "driver" role.
   * @returns Array of users with the driver role.
   */
  async findDrivers(): Promise<User[]> {

    const drivers = await this.userRepository
      .createQueryBuilder('user')
      .innerJoin('user.roles', 'rolesByUser')
      .innerJoin('rolesByUser.role', 'role')
      .where('role.name = :roleName', { roleName: 'driver' })
    .getMany();

    return drivers;
  }

  /**
   * Finds and returns a user by their ID.
   * @param id ID of the user to find.
   * @returns Found user or null if not found.
   * @throws NotFoundException if the user is not found.
   */
  async findById(id: number): Promise<User | null> {
    // Busca un usuario por su ID
    let user = this.userRepository.findOne({ where: { id: id} });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;

  }

  /**
   * Finds and returns a user by their email.
   * @param email Email of the user to find.
   * @returns Found user or null if not found.
   * @throws NotFoundException if the user is not found.
   */
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
