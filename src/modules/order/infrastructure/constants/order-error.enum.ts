import { Status } from '@prisma/client';
import { AppError } from 'common';

export const ORDER_ERROR = 'OrderError';

export enum OrderErrorEnum {
  ORDER001 = 'ORDER001',
  ORDER002 = 'ORDER002',
}

export const OrderError = (code: OrderErrorEnum, args: any): Readonly<AppError> => {
  let err: AppError;
  if (code === OrderErrorEnum.ORDER001) {
    err = {
      name: ORDER_ERROR,
      code: OrderErrorEnum.ORDER001,
      message: `${args} 은(는) 존재하지 않는 상품입니다.`,
    }
  }

  if (code === OrderErrorEnum.ORDER002) {
    switch (args.status) {
      case Status.NONE:
        err = {
          name: ORDER_ERROR,
          code: OrderErrorEnum.ORDER002,
          message: `${args.itemName} 은(는) 주문이 아무것도 아닌 기본 상태입니다.`,
        }
        break;
      case Status.ORDERED:
        err = {
          name: ORDER_ERROR,
          code: OrderErrorEnum.ORDER002,
          message: `${args.itemName} 은(는) 이미 주문이 접수 처리 되었습니다.`,
        }
        break;
      case Status.COMPLETE:
        err = {
          name: ORDER_ERROR,
          code: OrderErrorEnum.ORDER002,
          message: `${args.itemName} 은(는) 주문이 완료된 상태 입니다.`,
        }
        break;
    }

    return err;
  };
}
