import { Inject, Injectable } from '@nestjs/common';
import { CreateWorkoutRequest } from './dto/create-workout.request';
import { UpdateWorkoutRequest } from './dto/update-workout.request';
import { WorkoutRepository } from './workout.repository';
import { v4 } from 'uuid';
import { COMMUNICATION_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class WorkoutsService {

  constructor(private readonly workoutRepository: WorkoutRepository,
     @Inject(COMMUNICATION_SERVICE) private communicationClient: ClientProxy) {}

  async createWorkout(request: CreateWorkoutRequest, authentication: string) {
    const session = await this.workoutRepository.startTransaction();
    try {
      const workout = this.workoutRepository.create(request, { session });
      await lastValueFrom(
        this.communicationClient.emit('workout_created', {
          request,
          Authentication: authentication
        })
      );
      await session.commitTransaction();
      return workout;

    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
   
  }

  async getAllWorkouts() {
    try {
      return this.workoutRepository.find({}); 

    } catch (err) {
      throw err;
    }
  }

  async updateWorkout(workoutId: string, request: UpdateWorkoutRequest) {
    const session = await this.workoutRepository.startTransaction();
    try {
      return this.workoutRepository.findOneAndUpdate({ workoutId }, request);

    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async deleteWorkout(workoutId: string) {
    const session = await this.workoutRepository.startTransaction();
    try {
      const workout = await this.workoutRepository.findOne({ workoutId });
      return this.workoutRepository.delete(workout);

    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }
}
