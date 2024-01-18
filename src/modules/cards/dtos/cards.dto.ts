import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    number: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    exp_month: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    exp_year: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cvc: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    card_holder: string;
  }


  export class GetCardDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly email: string;
  }