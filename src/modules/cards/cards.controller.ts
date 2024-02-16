import { Controller, Post, Get, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

import { CardsService } from './cards.service';
import { CreateCardDto, DtoResCards, DtoResTokenizador, GetCardDto } from './dtos/cards.dto';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('tokenizador')
  async createCard(@Body() createCardDto: CreateCardDto): Promise<DtoResTokenizador> {
    const newCard = await this.cardsService.createCard(createCardDto);
    return { message: 'Tarjeta creada exitosamente', card: newCard };
  }

  @Get()
  async getUserCards(@Body() body: GetCardDto): Promise<DtoResCards>  {
    const userCards = await this.cardsService.getUserCards(body);
    return { message: 'Tarjetas del usuario', cards: userCards };
  }
}
