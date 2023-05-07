import { Body, Controller, Get, Post, Delete, Param } from '@nestjs/common';
import { Assignment } from './schemas/assignment.schema';
import { AssignmentService } from './assignment.service';
import { CreateAssignmentDto } from './dto/create-assignment-dto';


@Controller('assignment')
export class AssignmentController {
    constructor(private assignmentService: AssignmentService) {}

    @Get()
    async getAllAssigments():Promise<Assignment[]>
    {
        return this.assignmentService.findAll();
    }   

    @Post()
    async createAssignment(
        @Body()
        assignment: CreateAssignmentDto
    ):Promise<Assignment>
    {
        console.log("assignment controller calling create service")
        return this.assignmentService.create(assignment);

    }


    @Delete(':id')
    async deleteTask(
        @Param('id')//we define where to store ir
        id: string
    ):Promise<Assignment>

    {
        return this.assignmentService.deleteById(id);
    }

}

