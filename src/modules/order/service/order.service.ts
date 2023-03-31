import { Injectable } from '@nestjs/common';
import { Order, Prisma } from '@prisma/client';
import { PrismaService } from 'core';
import { concatMap, from, lastValueFrom, of, reduce } from 'rxjs';
import { OrderResponse } from '../api/dto/order.response';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) { }

  async findAll(): Promise<Array<OrderResponse>> {
    return await lastValueFrom(from(this.prismaService.order.findMany()).pipe(
      concatMap((orders: Array<Order>) => {
        return of(
          orders.map((order: Order) => {
            return {
              ...order
            };
          }),
        );
      }),
    ));
  }

  async find(orderId: string): Promise<Order> {
    return await lastValueFrom(from(
      this.prismaService.order.findUnique({
        where: {
          id: Number(orderId),
        },
      }),
    ).pipe(
      reduce((acc, value) => {
        return {
          ...acc,
          [value.id]: value,
        };
      }, {} as Order),
    ));
  }

  async save(OrderCreateInput: Prisma.OrderCreateInput): Promise<any> {
    return await lastValueFrom(from(this.prismaService.order.create({ data: OrderCreateInput })));
  }

  async modify(orderId: string, orderUpdateInput: Prisma.OrderUpdateInput): Promise<any> {
    return await lastValueFrom(from(
      this.prismaService.order.update({
        data: orderUpdateInput,
        where: {
          id: Number(orderId),
        },
      }),
    ));
  }

  async delete(orderId: string): Promise<any> {
    return await lastValueFrom(from(
      this.prismaService.order.delete({
        where: {
          id: Number(orderId),
        },
      }),
    ));
  }
}
