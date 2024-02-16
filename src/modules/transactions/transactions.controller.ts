import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePaymentGateWayDto, CreatePaymentSourceDto, CreateTransactionDto } from './transactions.dtos';

@Controller('transactions')
export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService) {}
  @UseGuards(AuthGuard)
  @Post('create-payment-source')
  async createPaymentSource(@Body() body: CreatePaymentSourceDto): Promise<{ message: string, id: number }> {

    const { message, id } = await this.transactionsService.createPaymentSource(body);
    return { message, id };
  }

  @UseGuards(AuthGuard)
  @Post('pay')
  async createTransaction(@Body() body: CreateTransactionDto): Promise<any> {
  
    const { message, transaction }  = await this.transactionsService.createTransaction(body);
    return { message, transaction };
  }

}