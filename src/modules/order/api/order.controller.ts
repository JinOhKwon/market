import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../service/order.service';
import { OrderRequest } from './dto/order.request';
import { OrderResponse } from './dto/order.response';

@ApiTags('order')
@Controller('api/order')
export class OrderController {
  constructor(private orderService: OrderService) { }

  @Get()
  @ApiOperation({ summary: '주문 목록 조회' })
  @ApiResponse({ status: 200, description: '목록 List' })
  @HttpCode(HttpStatus.OK)
  async getList(): Promise<Array<OrderResponse>> {
    return await this.orderService.findAll();
  }

  @Get(':orderId')
  @ApiOperation({ summary: '주문 단건 조회' })
  @ApiParam({ name: 'id', description: '주문 Id' })
  @ApiResponse({ status: 200, description: 'Id에 해당되는 1건 조회' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async get(@Param('orderId') orderId: string): Promise<OrderResponse> {
    return await this.orderService.find(orderId);
  }

  @Post(':orderId')
  @ApiOperation({ summary: '주문 1건 등록' })
  @ApiBody({ type: OrderRequest })
  @ApiResponse({ status: 200, description: '주문 1건 등록 성공' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() orderRequest: OrderRequest) {
    await this.orderService.save(orderRequest);
  }

  @Put(':orderId')
  @ApiOperation({ summary: '주문 1건 수정' })
  @ApiParam({ name: 'id', description: '주문 Id' })
  @ApiBody({ type: OrderRequest })
  @ApiResponse({ status: 200, description: '주문 1건 수정 성공' })
  @HttpCode(HttpStatus.OK)
  async update(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.modify(orderId, orderRequest);
  }

  @Patch(':orderId/accept')
  @ApiOperation({ summary: '주문 접수처리' })
  @ApiParam({ name: 'id', description: '주문 Id' })
  @ApiBody({ type: OrderRequest })
  @ApiResponse({ status: 200, description: '주문 접수처리 1건 성공' })
  @HttpCode(HttpStatus.OK)
  async orderAccept(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.orderAccept(orderId, orderRequest);
  }

  @Patch(':orderId/complete')
  @ApiOperation({ summary: '주문 완료처리' })
  @ApiParam({ name: 'id', description: '주문 Id' })
  @ApiBody({ type: OrderRequest })
  @ApiResponse({ status: 200, description: '주문 완료처리 1건 성공' })
  @HttpCode(HttpStatus.OK)
  async createComplete(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.createComplete(orderId, orderRequest);
  }

  @Patch(':orderId')
  @ApiOperation({ summary: '주문 부분 수정' })
  @ApiParam({ name: 'id', description: '주문 Id' })
  @ApiBody({ type: OrderRequest })
  @ApiResponse({ status: 200, description: '주문 부분 수정 완료처리 1건 성공' })
  @HttpCode(HttpStatus.OK)
  async patch(@Param('orderId') orderId: string, @Body() orderRequest: OrderRequest) {
    await this.orderService.modify(orderId, orderRequest);
  }

  @Delete(':orderId')
  @ApiOperation({ summary: '주문 삭제' })
  @ApiBody({ type: OrderRequest })
  @ApiResponse({ status: 200, description: '주문 삭제 1건 성공' })
  @HttpCode(HttpStatus.OK)
  async delete(@Param('orderId') orderId: string) {
    await this.orderService.delete(orderId);
  }
}
