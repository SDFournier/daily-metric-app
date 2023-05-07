import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateTaskDto {

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
    @IsDateString()
    readonly dateStartOfTask: string;
    @IsNotEmpty()
    @IsDateString()
    readonly dateEndOfTask: string;
    @IsNotEmpty()
    @IsNumber()
    readonly duration: number;

    
    
}