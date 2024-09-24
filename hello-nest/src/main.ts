import { NestFactory } from '@nestjs/core';
import { HelloModule } from './hello.module';

//nest 시작
async function bootstrap() {
  const app = await NestFactory.create(HelloModule);

  await app.listen(3000, () => {
    console.log('nest start at 3000 port');
  });
}

bootstrap();
