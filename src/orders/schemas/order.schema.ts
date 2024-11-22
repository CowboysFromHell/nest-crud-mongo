import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";


export type OrderDocument = Order & Document

@Schema()
export class Order{
    @Prop({Type:Types.ObjectId, ref:"Product", required:true})
    productId:Types.ObjectId

    @Prop({required:true})
    quantity:number
}

export const OrderSchema = SchemaFactory.createForClass(Order)


