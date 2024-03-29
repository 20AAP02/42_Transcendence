import { IsNotEmpty, IsString } from 'class-validator';

export class GameDTO {
  @IsString()
  @IsNotEmpty()
  winnerId: string;

  @IsString()
  @IsNotEmpty()
  loserId: string;

  @IsNotEmpty()
  loserScore: any;

  @IsString()
  @IsNotEmpty()
  winnerUsername: string;

  @IsString()
  @IsNotEmpty()
  loserUsername: string;
}
