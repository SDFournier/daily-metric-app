import { IsOptional, IsNotEmpty,IsEmpty, IsString, IsNumber, IsEnum, IsMongoId, IsDateString } from 'class-validator';
import mongoose, { Date } from 'mongoose';
//import { User } from 'src/auth/schemas/user.schema';

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;
    @IsString()
    readonly description: string;
    @IsNotEmpty()
    @IsString()
    readonly creator: string;
    @IsNotEmpty()
    @IsString()
    readonly assignment: string;
    @IsNotEmpty()
    @IsString()
    readonly category: string;
    @IsNotEmpty({message: 'dateStartOfTask is required'})
    @IsDateString()
    readonly dateStartOfTask: string;
    @IsOptional()
    @IsNotEmpty({message: 'dateEndOfTask is required'})
    @IsDateString()
    readonly dateEndOfTask: string;
    @IsNotEmpty({message: 'duration is required'})
    @IsNumber()
    readonly duration: number;


}