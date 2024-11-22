import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name)
        private orderModel:Model<OrderDocument>,
        private productService:ProductsService
    ){}

    async create(createOrderDto:CreateOrderDto):Promise<Order>{
        const newProduct = await this.productService.findOne(createOrderDto.productId)

        if(!newProduct){
            throw new NotFoundException("Product Not Found")
        }

        const result = new this.orderModel(createOrderDto)
        return result.save()
    }

    async findOne(id:string):Promise<Order>{
        const order = this.orderModel.findById(id).populate("productId").exec()
        return order
    }
}
