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

export class CreatePaymentGateWayDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly cardOwner : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly cardNumber : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly expiryDate : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly priceTotal  : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly cardType  : string;
}