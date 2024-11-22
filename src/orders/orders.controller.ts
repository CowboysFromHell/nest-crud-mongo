import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto:CreateOrderDto){
    return this.ordersService.create(createOrderDto)
  }

  @Get(":id")
  getOrderById(@Param("id") id:string){
    return this.ordersService.findOne(id)
  }
}
