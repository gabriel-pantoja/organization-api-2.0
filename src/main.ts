import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ErrorsInterceptor } from './core/security/errors.interceptor';
import { HttpExceptionFilter } from './core/security/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.enableCors();
  app.enableCors({
    origin: (origin, callback) => {
      if (process.env.NODE_ENV == 'production') {
        const allowedOrigins = ['https://organization.teamcoder.com.br'];
        if (allowedOrigins.includes(origin)) {
          console.log('allowed cors for:', origin);
          callback(null, true);
        } else {
          console.log('blocked cors for:', origin);
          throw new BadRequestException('cors');
        }
      } else {
        callback(null, true);
      }
    },
  });

  //app.use(helmet()); //which adds HTTP headers to make the service a bit more secure;
  //app.use(csurf()); //makes use of csurf to prevent attacks of cross-site request forgery;

  // app.use(LoggerMiddleware);
  //app.useGlobalInterceptors(new ErrorsInterceptor());
  // app.useGlobalInterceptors(new TransformInterceptor());
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Organization',
  };
  const config = new DocumentBuilder()
    .setTitle('Organization')
    .setDescription('API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('swagger', app, document, customOptions);
  // if (process.env.NODE_ENV != 'production') {
  // }
  await app.listen(3000);
  console.log('http://localhost:3000/');
  console.log('http://localhost:3000/swagger');
}
bootstrap();
