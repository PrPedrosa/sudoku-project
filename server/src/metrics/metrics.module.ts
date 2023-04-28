import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Metrics, MetricsSchema } from 'src/schemas/metrics.schema'
import { MetricsController } from './metrics.controller'
import { MetricsService } from './metrics.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Metrics.name, schema: MetricsSchema }])
  ],
  controllers: [MetricsController],
  providers: [MetricsService]
})
export class MetricsModule {}
