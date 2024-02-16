import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTripDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    current_latitude: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    current_longitude: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    destine_latitude: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    destine_longitude: string;
}

export class CompleteTripDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    token: string;

}