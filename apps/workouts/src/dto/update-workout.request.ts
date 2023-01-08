import { IsString, IsNotEmpty } from 'class-validator';
import { Exercise } from '../schemas/exercise.schema';

export class UpdateWorkoutRequest {
    @IsString() @IsNotEmpty() name: string;
    exercises: Exercise[];
}