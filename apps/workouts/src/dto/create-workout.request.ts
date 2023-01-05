import { IsString, IsNotEmpty } from 'class-validator';

export class CreateWorkoutRequest {
    @IsString() @IsNotEmpty() name: string;
}