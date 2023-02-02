import { UUID } from 'bson';
import { IsString, IsNotEmpty } from 'class-validator';
import { Exercise } from '../schemas/exercise.schema';
import { v4 } from 'uuid'; 
import { User } from 'apps/auth/src/users/schemas/user.schema';

export class CreateWorkoutRequest {
    workoutId: string;
    @IsString() @IsNotEmpty() name: string;
    @IsNotEmpty() exercises: Exercise[];
    user: User;
}