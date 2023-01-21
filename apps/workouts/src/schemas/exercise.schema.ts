import { AbstractDocument } from "@app/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { v4 as uuidv4 } from 'uuid';

@Schema({versionKey: false})
export class Exercise extends AbstractDocument {
    @Prop({ type: String, default: function genUUID() {
        return uuidv4()
    }})
    exerciseId: string;

    @Prop()
    name: string;

    @Prop()
    weight: number;

    @Prop()
    reps: string;

    @Prop()
    sets: number;

    @Prop()
    restTime: string;
}

export const exerciseSchema = SchemaFactory.createForClass(Exercise);