import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false })
export class Workout extends AbstractDocument {
    @Prop()
    name: string;

}


export const workoutSchema = SchemaFactory.createForClass(Workout);