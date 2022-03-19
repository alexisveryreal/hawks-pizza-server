import { IsEmail, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsEmail()
  public email: string;

  @IsString()
  public username: string;

  @IsString()
  public gender: string;
}
