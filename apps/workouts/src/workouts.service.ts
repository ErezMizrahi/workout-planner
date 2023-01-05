import { Injectable } from '@nestjs/common';
import { CreateWorkoutRequest } from './dto/create-workout.request';
import { WorkoutRepository } from './workout.repository';

@Injectable()
export class WorkoutsService {

  constructor(private readonly workoutRepository: WorkoutRepository) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createWorkout(request: CreateWorkoutRequest) {
    return this.workoutRepository.create(request);
  }

  async getAllWorkouts() {
    return this.workoutRepository.find({}); //
  }
}
