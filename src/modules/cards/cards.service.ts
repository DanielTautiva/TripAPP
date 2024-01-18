import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';

import { Cards } from './cards.entity';
import { User } from '../users/entitys/users.entity';
import { UsersService } from '../users/users.service';
import { CreateCardDto, GetCardDto } from './dtos/cards.dto';
import { exceptionHandler } from 'src/common/exception.handler';
import { ConfigService } from '@nestjs/config';
;

@Injectable()
export class CardsService {

  private readonly config: Record<string, string>;

  constructor(
    @InjectRepository(Cards)
    private cardsRepository: Repository<Cards>,
    private readonly usersService: UsersService,
    private configService: ConfigService
  ) {
    this.config = this.configService.get('config.integration');
  }

  async createCard(model: CreateCardDto): Promise<Cards> {
  
    // Verificar si el usuario existe
    const user = await this.usersService.findByEmail(model.email);

    // Realizar la solicitud a la API de Wompi para crear la tarjeta
    const token = await this.createWompiCard(model);

    if(!token){
        exceptionHandler("Error al crear tarjeta en Wompi")
    }
    // Crear la tarjeta en la base de datos
    const newCard = this.cardsRepository.create({
      id_user: user.id,
      token, // El ID devuelto por Wompi
    });

    return this.cardsRepository.save(newCard);
  }

  async getUserCards(body: GetCardDto): Promise<Cards[]> {
    try {
        // Verificar si el usuario existe
        const user = await this.usersService.findByEmail(body.email);

        // Obtener todas las tarjetas asociadas al usuario
        return this.cardsRepository.find({ where: { id_user: user.id } });

    } catch (error) { 
        exceptionHandler("Error al consultar la informacion del usuario", error)
    }
  }

  public async createWompiCard(model: CreateCardDto): Promise<any> {

    const wompiEndpoint = `${this.config.api}/tokens/cards`;
    const wompiPublicKey =  this.config.publicKey;
  
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${wompiPublicKey}`,
    };
  
    const data = {
      ...model,
    };
  
    try {
      const response = await axios.post(wompiEndpoint, data, { headers });

      // Extraer el valor del 'id' de la respuesta
      const wompiCardId = response.data.data.id ?? false
  
      return wompiCardId;

    } catch (error) { 
        return exceptionHandler("Error al crear tarjeta en Wompi", error)
    }
  }
}
