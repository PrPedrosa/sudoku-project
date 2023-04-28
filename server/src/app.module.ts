import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MetricsModule } from './metrics/metrics.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/sudoku'),
    MetricsModule
  ]
  //controllers: [AppController],
  //providers: [AppService],
})
export class AppModule {}
