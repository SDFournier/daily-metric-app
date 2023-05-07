import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import mongoose from 'mongoose';
import { Assignment } from 'src/assignment/schemas/assignment.schema';
import { Query } from 'express-serve-static-core';
import { Category } from 'src/category/schemas/category.schema';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: mongoose.Model<Task>,
        @InjectModel(Assignment.name)
        private assignmentModel: mongoose.Model<Assignment>,
        @InjectModel(Category.name)
        private categoryModel: mongoose.Model<Category>
    ){}

    async findAll(query: Query): Promise<Task[]>{

        const keyword = query.keyword ? {
            name: {
                $regex: query.keyword,
                $options: 'i'
            }
        }:{}
        
        const assignmentObjectId = query.assignmentid ? {
            assignment: new mongoose.Types.ObjectId(query['assignmentid'] as string)
          } : {};
        const tasks = await this.taskModel.find({$and: [{ ...keyword},{ ...assignmentObjectId }]}).sort({ createdAt: 'desc' });
        return tasks;
    }

    async create (task: Task): Promise<Task>{
        try{
    //check if the assigment exists:
    const assignmentExists = await this.assignmentModel.exists({ _id: task.assignment });

    const categoryExists = await this.categoryModel.exists({ _id: task.category });

    if (!assignmentExists) {
        console.log("sadsad")
        throw new BadRequestException('Invalid Assignment ID')
    } else if(!categoryExists)
    {
        console.log("sadsad")
        throw new BadRequestException('Invalid Category ID')
    }

    
    const res = await this.taskModel.create(task)
    return res;
    } catch (err) {
        throw err
    }
    }

    async findById (id: string): Promise<Task>{
        const task = await this.taskModel.findById(id)
        if(!task){

            throw new NotFoundException('Task not found.')
            
        }

        return task;
        
    }

    
    async updateById (id: string, task: Task): Promise<Task>{

        const res = await this.taskModel.findByIdAndUpdate(id,task,{
            new: true,
            runValidators: true,
        })
    
    if(!res){
        throw new NotFoundException('Task not found.')
    }
        return res
    }

    async deleteById (id: string): Promise<Task>{
        return await this.taskModel.findByIdAndDelete(id);
        
    }
    

    async findTaskByAssignmentId (assignmentId: string): Promise<Task[]>{
        const task = await this.taskModel.find({ assignment:  new mongoose.Types.ObjectId(assignmentId) }).exec();
        if(!task){

            throw new NotFoundException('Task with that assignment ID were not found.')
            
        }

        return task;
        
    }
    
}

