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
    app.listen(3000, () => {
      console.log('listening to requetss')
    })
  })
  .catch(err => console.log('the error', err))
