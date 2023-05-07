import { Body, Controller, Get, Param, Post, Put, Delete, Query, Res, HttpStatus, NotFoundException, BadRequestException  } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskDto } from './dto/update-task-dto';
import mongoose, { Date } from "mongoose";
import { Query as ExpressQuery } from 'express-serve-static-core'
import { Response } from 'express';

@Controller('task')
export class TaskController {
    constructor(private taskService: TaskService){

    }

    @Get()
    async getAllTasks(@Query() query: ExpressQuery):Promise<Task[]>
    {
        return this.taskService.findAll(query);
    
    }

    @Post()
    async createTask(
    @Body()
        createTaskDto: CreateTaskDto
    ):Promise<Task>
    {
        try {
        const { assignment, category, dateEndOfTask , dateStartOfTask , ...task } = createTaskDto;
        return  this.taskService.create({
            ...task,
            assignment: new mongoose.Types.ObjectId(assignment),
            category: new mongoose.Types.ObjectId(category),
            dateStartOfTask:  new Date(dateStartOfTask),
            dateEndOfTask:  new Date(dateEndOfTask)
        });
        } catch (error) {
            throw new BadRequestException(error.message)
        }
    }


    @Get(':id')//this define the route will be: book/*id* of the book
    async getBook(
    @Param('id')//we define where to store ir
    id: string
    ):Promise<Task>
    {
         return this.taskService.findById(id);
    }

    //get tasks by assignemnt
    @Get('byassignment/:id')
    async getTaskByAssignment(
    @Param('id')//we define where to store ir
    id: string
    ):Promise<Task[]>
    {
         return this.taskService.findTaskByAssignmentId(id);
    }

    @Put(':id')
    async updateBook(
        @Param('id')//we define where to store ir

        id: string,
    @Body()
        updateTaskDto: UpdateTaskDto,

    ):Promise<Task>

    {

        const { assignment, category, dateEndOfTask , dateStartOfTask, ...task } = updateTaskDto;
        return this.taskService.updateById(id,{
            ...task,
            category: new mongoose.Types.ObjectId(category),
            assignment: new mongoose.Types.ObjectId(assignment),
            dateEndOfTask: new Date(dateStartOfTask),
            dateStartOfTask: new Date(dateStartOfTask),
        });

    }

    @Delete(':id')
    async deleteTask(

        @Param('id')//we define where to store ir
        id: string

    ):Promise<Task>
    {
        return this.taskService.deleteById(id);

    }
    
    
}
