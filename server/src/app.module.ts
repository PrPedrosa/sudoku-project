require('dotenv').config()
import { Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MetricsModule } from './metrics/metrics.module'
import { GamesModule } from './games/games.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION_STRING),
    MetricsModule,
    GamesModule
  ]
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
