import { AppError } from 'common';

export const ORDER_ERROR = 'OrderError';

export enum OrderErrorEnum {
  USER001 = 'USER001',
}

export const OrderError: Readonly<{ [key in OrderErrorEnum]: AppError }> = {
  [OrderErrorEnum.USER001]: {
    name: ORDER_ERROR,
    code: 'USER001',
    message: '%s 은(는) 존재하지 않는 상품입니다.',
  },
};
