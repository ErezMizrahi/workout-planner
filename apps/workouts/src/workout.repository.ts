import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { Workout } from "./schemas/workout.schema";
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from "mongoose";

@Injectable()
export class WorkoutRepository extends AbstractRepository<Workout> {
    protected readonly logger = new Logger(WorkoutRepository.name);

    constructor(
        @InjectModel(Workout.name) workoutModel: Model<Workout>,
        @InjectConnection() connection: Connection
    ) {
        super(workoutModel, connection);
    }
}

