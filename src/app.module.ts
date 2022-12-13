import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    MongooseModule.forRoot(
      process.env.DB_MONGO_URI || 'mongodb://localhost/nest_task',
    ),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
