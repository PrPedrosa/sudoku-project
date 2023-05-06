import { Controller, Post, Get, Body } from '@nestjs/common'
import { GamesService } from './games.service'

@Controller('/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('/all')
  async getGames() {
    return await this.gamesService.fetchGames()
  }

  @Post('/game')
  async postGame(
    @Body('game') game: { user: string; time: number; difficulty: string }
  ) {
    return await this.gamesService.createGame(game)
  }
}
