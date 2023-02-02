import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Exercise } from "./exercise.schema";
import { v4 as uuidv4 } from 'uuid';
import { User } from "apps/auth/src/users/schemas/user.schema";
import { Type } from "class-transformer";

@Schema({ versionKey: false })
export class Workout extends AbstractDocument {

    @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }}) 
    workoutId: string;

    @Prop()
    name: string;

    // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }] })
    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' })

    @Prop()
    exercises: Exercise[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
    @Type(() => User)
    user: User;

}


export const workoutSchema = SchemaFactory.createForClass(Workout);