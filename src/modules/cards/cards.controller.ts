import { Controller, Post, Get, Param, Body, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';

import { CardsService } from './cards.service';
import { CreateCardDto, GetCardDto } from './dtos/cards.dto';

@UseGuards(AuthGuard)
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post('tokenizador')
  async createCard(@Body() createCardDto: CreateCardDto) {
    const newCard = await this.cardsService.createCard(createCardDto);
    return { message: 'Tarjeta creada exitosamente', card: newCard };
  }

  @Get()
  async getUserCards(@Body() body: GetCardDto) {

    const userCards = await this.cardsService.getUserCards(body);
    return { cards: userCards };
  }
}
