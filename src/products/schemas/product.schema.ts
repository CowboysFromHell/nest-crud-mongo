import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductDocument = Product & Document

@Schema()
export class Product{
    @Prop({required:true})
    name:string 

    @Prop()
    description:string

    @Prop()
    price:string 
}

export const ProductSchema = SchemaFactory.createForClass(Product)