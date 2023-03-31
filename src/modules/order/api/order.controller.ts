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
  @HttpCode(HttpStatus.OK)
  get(@Param('orderId') orderId: string): Promise<OrderResponse> {
    return this.orderService.find(orderId);
  }

  @Post(':orderId')
  @HttpCode(HttpStatus.CREATED)
  async create(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.save(orderId, orderRequest);
  }

  @Put(':orderId')
  @HttpCode(HttpStatus.OK)
  async update(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.modify(orderId, orderRequest);
  }

  @Patch(':orderId/accept')
  @HttpCode(HttpStatus.OK)
  async orderAccept(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.orderAccept(orderId, orderRequest);
  }

  @Patch(':orderId/complete')
  @HttpCode(HttpStatus.OK)
  async createComplete(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.createComplete(orderId, orderRequest);
  }

  @Patch(':orderId')
  @HttpCode(HttpStatus.OK)
  async patch(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.modify(orderId, orderRequest);
  }

  @Delete(':orderId')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('orderId') orderId: string) {
    await this.orderService.delete(orderId);
  }
}
