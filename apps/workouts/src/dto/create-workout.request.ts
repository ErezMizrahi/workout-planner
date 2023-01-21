import { UUID } from 'bson';
import { IsString, IsNotEmpty } from 'class-validator';
import { Exercise } from '../schemas/exercise.schema';
import { v4 } from 'uuid'; 

export class CreateWorkoutRequest {
    workoutId: string;
    @IsString() @IsNotEmpty() name: string;
    @IsNotEmpty() exercises: Exercise[];
}