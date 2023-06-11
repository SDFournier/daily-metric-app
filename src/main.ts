import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const forever = require('forever')
const cors = require('cors')
//import { cors } from 'cors';

async function bootstrap() {  
  
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService); 
  app.use(cors()); 
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get<number>('PORT') || 3000);
   // Restart the application in case of failure
   forever.startServer(app);
}
bootstrap();
