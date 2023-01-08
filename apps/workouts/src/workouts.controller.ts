import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateWorkoutRequest } from './dto/create-workout.request';
import { UpdateWorkoutRequest } from './dto/update-workout.request';
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

  @Patch(':workoutId')
  findWorkoutAndUpdate(@Param('workoutId') workoutId: string, @Body() request: UpdateWorkoutRequest) {
    return this.workoutsService.updateWorkout(workoutId, request);
  }

  @Delete(':workoutId')
  findAndDelete(@Param('workoutId') workoutId: string) {
    return this.workoutsService.deleteWorkout(workoutId);
  }
}
