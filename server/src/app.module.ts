require('dotenv').config()
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MetricsModule } from './metrics/metrics.module'
import { GamesModule } from './games/games.module'
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    MetricsModule,
    GamesModule
  ]
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
