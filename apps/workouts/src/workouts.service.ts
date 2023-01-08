import { Injectable } from '@nestjs/common';
import { CreateWorkoutRequest } from './dto/create-workout.request';
import { UpdateWorkoutRequest } from './dto/update-workout.request';
import { WorkoutRepository } from './workout.repository';
import { v4 } from 'uuid';

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

  async updateWorkout(workoutId, request: UpdateWorkoutRequest) {
    return this.workoutRepository.findOneAndUpdate({ workoutId }, request);
  }

  async deleteWorkout(workoutId) {
    const workout = await this.workoutRepository.findOne({ workoutId });
    console.log(workout)
    return this.workoutRepository.delete(workout);
  }
}
