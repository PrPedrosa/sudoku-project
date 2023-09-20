import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
//require('dotenv').config()

/* async function bootstrap() {
  const app = await NestFactory.create(
    AppModule , {
    cors: { origin: `${process.env.ORIGIN}` }
  }
  )

  await app.listen(3000, () => {
    console.log('listening to requetss')
  })
}
bootstrap() */
NestFactory.create(AppModule)
  .then(app => {
    app.enableCors({ origin: process.env.ORIGIN })
    app.listen(3000, () => {
      console.log('listening to requests')
    })
  })
  .catch(err => console.log('the error', err))
