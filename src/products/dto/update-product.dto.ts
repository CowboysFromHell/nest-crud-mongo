import { IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateProductDto{
    @IsString()
    readonly name?:string 

    @IsOptional()
    @IsString()
    readonly description?:string

    @IsNumber()
    readonly price?:number
}