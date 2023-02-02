import { JWTAuthGuard } from '@app/common';
import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CreateWorkoutRequest } from './dto/create-workout.request';
import { UpdateWorkoutRequest } from './dto/update-workout.request';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}
  
  logger = new Logger(WorkoutsController.name);

  @UseGuards(JWTAuthGuard)
  @Post()
  createWorkout(@Body() request: CreateWorkoutRequest, @Req() req: any)  {
    this.logger.debug("user ", req.user);
    return this.workoutsService.createWorkout(request, req.cookies?.Authentication, req.user);
  }

  @Get()
  getAllWorkouts(@Query('user') user: string){
    return this.workoutsService.getAllWorkouts(user);
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
