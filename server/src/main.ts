import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
require('dotenv').config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: `${process.env.ORIGIN}` }
  })

  await app.listen(3000)
}
bootstrap()
