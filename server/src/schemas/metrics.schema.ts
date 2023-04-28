import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
//import { HydratedDocument } from 'mongoose'

//export type MetricsDoc = HydratedDocument<Metric>

@Schema({
  collection: 'app_metrics',
  timestamps: true,
  minimize: false
})
export class Metrics {
  @Prop({ required: true }) name: string
  @Prop({ required: true }) visits: number
  @Prop({ required: true }) downloads: number
}

export const MetricsSchema = SchemaFactory.createForClass(Metrics)
