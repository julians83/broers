import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { UsersService } from '../users.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const usersService = app.get(UsersService);

  const users = [
    {
      fullName: 'Test 1',
      email: 'test1@test.com',
      password: 'test123',
      isActive: true,
    },
    {
      fullName: 'Test 2',
      email: 'test2@test.com',
      password: 'test123',
      isActive: true,
    },
    {
      fullName: 'Test 3',
      email: 'test3@test.com',
      password: 'test123',
      isActive: true,
    },
    {
      fullName: 'Test 4',
      email: 'test4@test.com',
      password: 'test123',
      isActive: true,
    },
    {
      fullName: 'Test 5',
      email: 'test5@test.com',
      password: 'test123',
      isActive: true,
    },
  ];

  for (const user of users) {
    const existingUser = await usersService.findByEmail(user.email);
    if (!existingUser) {
      const createdUser = await usersService.create(user);
      console.log(`✅ Usuario creado: ${createdUser.email}`);
    } else {
      console.log(
        `⚠️ Usuario ya existente: ${existingUser.email}, no se creará.`,
      );
    }
  }

  console.log('✅ Seed ejecutado correctamente.');
  await app.close();
}

seed().catch((error) => {
  console.error('❌ Error al ejecutar el seed:', error);
});
