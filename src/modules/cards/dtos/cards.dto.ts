import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested } from 'class-validator';

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

  class cardRes {
      @ApiProperty()
      @IsNumber()
      id_user: number;
      
      @ApiProperty()
      @IsString()
      token: string;
      
      @ApiProperty()
      @IsNumber()
      id_card: number;
  }

  export class DtoResCards{

    @ApiProperty()
    @IsString()
    readonly message: string;
    
    @ApiProperty()
    @IsArray()
    readonly cards:cardRes[]
  }

  export class DtoResTokenizador {
    @ApiProperty()
    @IsString()
    readonly message: string;
    
    @ApiProperty()
    @IsObject()
    @Type(() => cardRes)
    readonly card:cardRes
  }

 