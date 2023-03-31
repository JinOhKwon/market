# market

# Swagger 주소
http://localhost:3030/swagger
# 프로젝트 실행 순서

```
1. docker-compose up -d 

2. npm install

// 코드 생성
3. npx prisma generate

// db 반영
4. npx prisma db push

// seed 생성
5. npx prisma db seed

6. npm run start

7. http://localhost:3030/swagger 주소에 접속해서 rest api 찾아서 사용 
  단일 주문조회: /api/orders/{id}
  주문 목록조회: /api/orders
  주문 접수처리: /api/orders/{id}/accept
  주문 완료처리: /api/orders/{id}/complete

이 외에 c, u, d 생성 총 7개 사용 

default app에 기본으로 들어가는 rest 주소 무시해도 상관 없습니다.
```

# prisma studio
```
// prisma용 웹 DB클라이언트 라고 생각하면 된다.
npx prisma stuido
```


