import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          // hash password before saving to database
          schema.pre('save', async function () {
            if (this.isModified('password')) {
              const salt = await bcrypt.genSalt(10);
              this.password = await bcrypt.hash(this.password, salt);
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
