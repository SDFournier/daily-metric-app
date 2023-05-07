import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskSchema } from './schemas/task.schema';
import { AssignmentSchema } from 'src/assignment/schemas/assignment.schema';
import { CategorySchema } from 'src/category/schemas/category.schema';

@Module({
  imports : [
    MongooseModule.forFeature([{
      name: 'Task',
      schema: TaskSchema
      
    },{
      name: 'Assignment',
      schema: AssignmentSchema
    },{
      name: 'Category',
      schema: CategorySchema
    }
  ])
  ],
  controllers: [TaskController],
  providers: [TaskService]
})
export class TaskModule {}
