import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWorkoutRequest } from './dto/create-workout.request';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  createWorkout(@Body() request: CreateWorkoutRequest)  {
    return this.workoutsService.createWorkout(request);
  }

  @Get()
  getAllWorkouts(){
    return this.workoutsService.getAllWorkouts();
  }
}
