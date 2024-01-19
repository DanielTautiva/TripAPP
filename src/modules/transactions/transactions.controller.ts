import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreatePaymentGateWayDto, CreatePaymentSourceDto, CreateTransactionDto } from './transactions.dtos';

@Controller('transactions')
export class TransactionsController {

  constructor(private readonly transactionsService: TransactionsService) {}
  @UseGuards(AuthGuard)
  @Post('create-payment-source')
  async createPaymentSource(@Body() body: CreatePaymentSourceDto): Promise<{ id: number }> {

    const paymentSourceId = await this.transactionsService.createPaymentSource(body);
    return { id: paymentSourceId };
  }

  @UseGuards(AuthGuard)
  @Post('pay')
  async createTransaction(@Body() body: CreateTransactionDto): Promise<any> {
  
    const result = await this.transactionsService.createTransaction(body);
    return result;
  }


  @Post('pay-gateway')
  async createPaymentgateway(@Body() body: CreatePaymentGateWayDto): Promise<any> {
  
    const result = await this.transactionsService.createPaymentgateway(body);
    return result;
  }


}