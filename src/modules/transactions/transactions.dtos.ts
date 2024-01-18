import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class CreatePaymentSourceDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly customer_email: string;

}

export class CreateTransactionDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly idTrip: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly totalAmount: number;

}