import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category-dto';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}


    @Get()
    async getAllBooks():Promise<Category[]>
    {
        return this.categoryService.findAll();
    } 

    @Post()
    async createCategory(
    @Body()
    category: CreateCategoryDto,

     ):Promise<Category>
     {

     return this.categoryService.create(category);

    }
    
    
}

