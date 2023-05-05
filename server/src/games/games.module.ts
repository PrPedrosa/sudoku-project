import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Game, GamesSchema } from 'src/schemas/game.schema'
import { GamesController } from './games.controller'
import { GamesService } from './games.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GamesSchema }])
  ],
  controllers: [GamesController],
  providers: [GamesService]
})
export class GamesModule {}
