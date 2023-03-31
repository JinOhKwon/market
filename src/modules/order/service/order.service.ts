import { Injectable } from '@nestjs/common';
import { Order, Prisma, Status } from '@prisma/client';
import { PrismaService } from 'core';
import { isEmpty } from 'lodash';
import { from, lastValueFrom } from 'rxjs';
import { OrderResponse } from '../api/dto/order.response';
import { OrderError, OrderErrorEnum } from '../infrastructure/constants/order-error.enum';
import { OrderNotFoundException } from '../infrastructure/exception/order-notfound.exception';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) { }

  async findAll(): Promise<Array<OrderResponse>> {
    return await lastValueFrom(from(this.prismaService.order.findMany()));
  }

  async find(orderId: string): Promise<Order> {
    return await lastValueFrom(from(
      this.prismaService.order.findUnique({
        where: {
          id: Number(orderId),
        },
      }),
    ));
  }

  async orderAccept(orderId: string, orderUpdateInput: Prisma.OrderUpdateInput): Promise<any> {
    let param: Prisma.OrderUpdateInput;

    const result = await this.find(orderId);

    if (isEmpty(result)) {
      throw new OrderNotFoundException(OrderError(OrderErrorEnum.ORDER001, orderId));
    }

    if (result.status === Status.NONE) {
      param = {
        ...orderUpdateInput,
        status: Status.ORDERED,
      }
      await lastValueFrom(from(
        this.prismaService.order.update({
          data: param,
          where: {
            id: Number(orderId),
          },
        }),
      ));
    } else {
      throw new OrderNotFoundException(OrderError(OrderErrorEnum.ORDER002, {
        status: result.status,
        itemName: result.itemName
      }));
    }
  }

  async createComplete(orderId: string, orderUpdateInput: Prisma.OrderUpdateInput): Promise<any> {
    let param: Prisma.OrderUpdateInput;

    const result = await this.find(orderId);

    if (isEmpty(result)) {
      throw new OrderNotFoundException(OrderError(OrderErrorEnum.ORDER001, orderId));
    }

    if (result.status !== Status.COMPLETE) {
      param = {
        ...orderUpdateInput,
        status: Status.COMPLETE,
      }
      await lastValueFrom(from(
        this.prismaService.order.update({
          data: param,
          where: {
            id: Number(orderId),
          },
        }),
      ));
    } else {
      throw new OrderNotFoundException(OrderError(OrderErrorEnum.ORDER002, {
        status: result.status,
        itemName: result.itemName
      }));
    }
  }

  async save(orderId: string, orderCreateInput: Prisma.OrderCreateInput): Promise<any> {
    const result = await this.find(orderId);
    if (isEmpty(result)) {
      throw new OrderNotFoundException(OrderError(OrderErrorEnum.ORDER001, orderId));
    }

    await lastValueFrom(from(this.prismaService.order.create({ data: orderCreateInput })));
  }

  async modify(orderId: string, orderUpdateInput: Prisma.OrderUpdateInput): Promise<any> {
    const result = await this.find(orderId);
    if (isEmpty(result)) {
      throw new OrderNotFoundException(OrderError(OrderErrorEnum.ORDER001, orderId));
    }

    await lastValueFrom(from(
      this.prismaService.order.update({
        data: orderUpdateInput,
        where: {
          id: Number(orderId),
        },
      }),
    ));
  }

  async delete(orderId: string): Promise<any> {
    const result = await this.find(orderId);
    if (isEmpty(result)) {
      throw new OrderNotFoundException(OrderError(OrderErrorEnum.ORDER001, orderId));
    }

    await lastValueFrom(from(
      this.prismaService.order.delete({
        where: {
          id: Number(orderId),
        },
      }),
    ));
  }
}
