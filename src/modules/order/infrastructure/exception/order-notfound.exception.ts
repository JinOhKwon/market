import { NotFoundException } from '@nestjs/common';
import { AppError } from 'common';

export class OrderNotFoundException extends NotFoundException {
  // eslint-disable-next-line constructor-super
  constructor(errData?: AppError | string, ...msgArgs: Array<string> | Array<number>) {
    if (errData) {
      if (typeof errData === 'string') {
        super(errData);
      } else {
        const iError = errData as AppError;
        iError.msgArgs = msgArgs;
        super(iError);
      }
    }
  }
}
