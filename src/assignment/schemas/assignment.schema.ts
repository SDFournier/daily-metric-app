import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
	timestamps: true   
})
export class Assignment {

    @Prop()
        name: string;
    
    @Prop()
        description: string;
    
    @Prop()
        author: string;
    @Prop()
        category: string;
    @Prop()
        color: string;
    
    }

    export const AssignmentSchema = SchemaFactory.createForClass(Assignment)