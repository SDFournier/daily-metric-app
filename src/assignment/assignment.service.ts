import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Task } from 'src/task/schemas/task.schema';
import { Assignment } from './schemas/assignment.schema';


@Injectable()
export class AssignmentService {

    constructor(
        @InjectModel(Assignment.name)
        private assignmentModel: mongoose.Model<Assignment>
    ){}
    async findAll(): Promise<Assignment[]>{

        const assignments = await this.assignmentModel.find();
        return assignments;
    }

    async create (assignment: Assignment): Promise<Assignment>{
        //create is a mongoose function
        console.log("assignment: ", assignment)
        const res = await this.assignmentModel.create(assignment)
        return res;
    
    }

    async deleteById (id: string): Promise<Assignment>{

        console.log("id: ", id)
        return await this.assignmentModel.findByIdAndDelete(id);
        
    }
}