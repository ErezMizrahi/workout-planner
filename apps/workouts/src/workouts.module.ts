import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import * as Joi from 'joi';
import { DatabaseModule } from '@app/common';
import { WorkoutRepository } from './workout.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Workout, workoutSchema } from './schemas/workout.schema';
import { Exercise, exerciseSchema } from './schemas/exercise.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required()
      }),
      envFilePath: './apps/workouts/.env'
    }),
    DatabaseModule,
    MongooseModule. forFeature([ { name: Workout.name, schema: workoutSchema }, {name: Exercise.name, schema: exerciseSchema} ])
  ],
  controllers: [WorkoutsController],
  providers: [WorkoutsService, WorkoutRepository],
})
export class WorkoutsModule {}
