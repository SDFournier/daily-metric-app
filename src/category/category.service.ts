import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import mongoose from 'mongoose';

@Injectable()
export class CategoryService {
    constructor(
     @InjectModel(Category.name)
     private categoryModel: mongoose.Model<Category>
    ){}

    async findAll(): Promise<Category[]>{

        const books = await this.categoryModel.find();
        
        return books;
        
    }

    async create(category: Category): Promise<Category>{

        //create is a mongoose function
        const res = await this.categoryModel.create(category)
        
        return res;
        
    }
}
