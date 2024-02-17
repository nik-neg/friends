import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new HttpExceptionFilter());

  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get<number>('PORT');

  app.enableCors({
    origin: (origin, callback) => {
      const allowedOrigins = JSON.parse(configService.get('ALLOWED_ORIGINS'));

      const regex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d{1,5})?(\/.*)?$/;
      if (!origin || regex.test(origin) || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log({ origin, test: regex.test(origin) });
        callback(new Error('Not allowed by CORS'));
      }

    },
    methods: 'GET,POST,PUT, PATCH, DELETE',
    allowedHeaders: 'Content-Type,Accept,Authorization',
  });

  console.log(`Server is running on port ${port}`);
  await app.listen(port);
}

bootstrap();
