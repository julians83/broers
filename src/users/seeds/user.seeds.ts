import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../users.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  await usersService.create({
    fullName: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    // isActive: true,
  });

  console.log('Usuarios de prueba creados');
  await app.close();
}

seed();
