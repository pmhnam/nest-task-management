import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost/nest_task'),
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
