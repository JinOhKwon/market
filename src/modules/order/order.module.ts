import { Module } from '@nestjs/common';
import { DatabaseModule } from 'core';
import { OrderController } from './api/order.controller';
import { OrderService } from './service/order.service';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  exports: [OrderService],
  providers: [OrderService],
})
export class OrderModule { }
