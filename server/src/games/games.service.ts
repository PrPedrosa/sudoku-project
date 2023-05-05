import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Game } from 'src/schemas/game.schema'

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name)
    private readonly gamesModel: Model<Game>
  ) {}

  //returns all games sorted by difficulty ([[easy], [medium], [hard]]) and time (best to worst)
  async fetchGames() {
    try {
      const games = (await this.gamesModel.find()).map(g => {
        return { user: g.user, time: g.time, difficulty: g.difficulty }
      })
      const easyGames = games.filter(g => g.difficulty === 'easy')
      const mediumGames = games.filter(g => g.difficulty === 'medium')
      const hardGames = games.filter(g => g.difficulty === 'hard')

      return [
        easyGames.sort((a, b) => a.time - b.time),
        mediumGames.sort((a, b) => a.time - b.time),
        hardGames.sort((a, b) => a.time - b.time)
      ]
    } catch (error) {
      console.log('ERROR fetching games from db =>', error)
    }
  }

  async createGame(game: { user: string; time: number; difficulty: string }) {
    const games = await this.gamesModel.find({ difficulty: game.difficulty })
    try {
      if (game.user.length > 4)
        throw new BadRequestException('user has to have 4 or less characters')

      if (games.length < 10) {
        await this.gamesModel.create({
          user: game.user,
          time: game.time,
          difficulty: game.difficulty
        })
        return 'added'
      }

      const worstGame = games.sort((a, b) => b.time - a.time)[0]
      if (worstGame.time < game.time) return 'too slow'

      await this.gamesModel.replaceOne({ _id: worstGame._id }, game)
      return 'added'
    } catch (error) {
      console.log('ERROR creating game =>', error)
    }
  }
}
