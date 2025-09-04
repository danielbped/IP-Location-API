import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions = {
    origin: true,
    methods: 'GET, HEAD, PUT, POST, DELETE',
  }

  const config = new DocumentBuilder()
    .setTitle('IP Location API')
    .setDescription('The IP Location API description')
    .setVersion('1.0.0')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  app.enableCors(corsOptions)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();