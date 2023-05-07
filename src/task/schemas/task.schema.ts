import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema({
	timestamps: true   
})
export class Task{
    @Prop()
        name: string;
    @Prop()
        creator: string;
    @Prop()
        description: string;
    @Prop({ type: mongoose.Types.ObjectId, ref: 'Assignment'}) //this only works to do searches later in the mongoDB more efficiently
        assignment: mongoose.Types.ObjectId;
    @Prop({ type: mongoose.Types.ObjectId, ref: 'Category'}) //this only works to do searches later in the mongoDB more efficiently
        category: mongoose.Types.ObjectId;
    @Prop({ required: true })
        dateStartOfTask: Date;
    @Prop({ required: true })
        dateEndOfTask: Date;
    @Prop({ required: true })
        duration: number;


}

export const TaskSchema = SchemaFactory.createForClass(Task)
