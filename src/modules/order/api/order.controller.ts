import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { OrderService } from '../service/order.service';
import { OrderRequest } from './dto/order.request';
import { OrderResponse } from './dto/order.response';

@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(): Promise<Array<OrderResponse>> {
    return await this.orderService.findAll();
  }

  @Get(':orderId')
  @HttpCode(HttpStatus.CREATED)
  get(@Param('orderId') orderId: string): Promise<OrderResponse> {
    return this.orderService.find(orderId);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() orderRequest: OrderRequest) {
    return this.orderService.save(orderRequest);
  }

  @Put(':orderId')
  @HttpCode(HttpStatus.OK)
  update(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    return this.orderService.modify(orderId, orderRequest);
  }

  @Patch(':orderId')
  @HttpCode(HttpStatus.OK)
  patch(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    return this.orderService.modify(orderId, orderRequest);
  }
  @Delete(':orderId')
  @HttpCode(HttpStatus.OK)
  delete(@Param('orderId') orderId: string) {
    return this.orderService.delete(orderId);
  }
}
