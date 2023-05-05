import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
//import { HydratedDocument } from 'mongoose'

//export type MetricsDoc = HydratedDocument<Metric>

@Schema({
  collection: 'best_games',
  timestamps: true,
  minimize: false
})
export class Game {
  @Prop({ required: true }) user: string
  @Prop({ required: true }) time: number
  @Prop({ required: true }) difficulty: string
}

export const GamesSchema = SchemaFactory.createForClass(Game)
