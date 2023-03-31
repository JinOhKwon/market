import { ApiProperty } from '@nestjs/swagger';
import { Order, Status } from '@prisma/client';


export class OrderRequest implements Order {
  @ApiProperty({
    name: 'id',
    description: '주문 시퀀스',
    type: Number,
  })
  readonly id: number;

  @ApiProperty({
    name: 'itemName',
    description: '상품명',
    type: String,
  })
  readonly itemName: string;

  @ApiProperty({
    name: 'customerId',
    description: '주문자 아이디',
    type: Number,
  })
  readonly customerId: number;

  @ApiProperty({
    name: 'price',
    description: '금액',
    type: Number,
  })
  readonly price: number;

  @ApiProperty({
    name: 'status',
    description: '주문 상태',
    type: String,
    enum: Status,
  })
  readonly status: Status;

  @ApiProperty({
    name: 'regId',
    description: '등록자 아이디',
    type: String,
  })
  readonly regId: string | null;

  @ApiProperty({
    name: 'regNm',
    description: '등록자 명',
    type: String,
  })
  readonly regNm: string | null;

  @ApiProperty({
    name: 'chgId',
    description: '변경자 아이디',
    type: String,
  })
  readonly chgId: string | null;

  @ApiProperty({
    name: 'chgNm',
    description: '변경자 명',
    type: String,
  })
  readonly chgNm: string | null;

  @ApiProperty({
    name: 'chgDt',
    description: '변경 일시',
    type: Date,
  })
  readonly chgDt: Date;

  @ApiProperty({
    name: 'regDt',
    description: '등록 일시',
    type: Date,
  })
  readonly regDt: Date;
}
