/* eslint-disable no-unused-vars */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class SignupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}

export function generateRandomSignupDto(): SignupDto {
  
  const randomEmail = `user${Math.floor(Math.random() * 100000)}@example.com`;
  const randomFullname = `Random User ${Math.floor(Math.random() * 100)}`;
  const randomPhoneNumber = `${Math.floor(Math.random() * 1000000000)}`;
  const randomPassword = `password${Math.floor(Math.random() * 100)}`;

  const signupDto = {
    email: randomEmail,
    fullname: randomFullname,
    phone_number: randomPhoneNumber,
    password: randomPassword,
  };

  return signupDto;
}