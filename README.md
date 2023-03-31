# market

# 관련 자료

[prisma reference](https://www.prisma.io/docs/reference)

# 프로젝트 실행 순서

```
docker-compose up -d 

npm install

// 코드 생성
npx prisma generate

// db 반영
npx prisma db push

// seed 생성
npx prisma db seed

npm run start

```

# prisma studio
```
// prisma용 웹 DB클라이언트 라고 생각하면 된다.
npx prisma stuido
```

# prisma 명령어

```
// prisma schema db에 반영
npx prisma db push


// 적용되지 않은 가장 최근의 마이그레이션 파일을 사용 - 없으면 새로 만듬
// migrate는 데이터베이스 내용을 초기화
npx prisma migrate dev

// 임시 마이그레이션 파일 만들기
npx prisma migrate dev --name 파일이름 --create-only

// 마이그레이션 파일 수정하기
ALTER TABLE "Profile"
RENAME COLUMN "biograpy" TO "biography"

// 임시 마이그레이션 파일 DB에 적용하기
npx prisma migrate dev

// DB 재설정 (초기화)
npx prisma migrate reset

// DB를 수동으로 수정한뒤에 수정사항 가져오기
npx prisma db pull

// DB를 수동으로 수정한뒤에 마이그레이션 파일에 저장하기
npx prisma migrate dev --name 마이그레이션
```

# Prisma connection test 안하는 이유
- 현재 jest에서 memory 이슈 관련으로 많은 문제가 제기되고 있음
- jest, nest 인지 판단은 안되지만 해당 이슈 링크를 보고 계속 참조 [Prisma issue](https://github.com/prisma/prisma/issues/12339)

# Jest 

## Jest 작성시 unit test기준 (전체 파일을 하고 싶다고 하면)

- collectCoverageFrom 키에서 "src/**/*.{js,jsx,tsx,ts}" 를 주면 전체 file 커버리지 테스트를 진행하게됨

``` json
{
  "rootDir": ".",
  "testRegex": ".*\\.spec\\.ts$",
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,tsx,ts}",
    "!src/**/*index.{js,jsx,tsx,ts}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!**/webpack-hmr.config.ts",
    "!**/coverage/**"
  ],
  "coverageReporters": [
    "json",
    "lcov"
  ],
  // etc...
}
```

## Jest 작성시 unit test기준 (spec 기준으로 작성을 하고 싶다면)

-  collectCoverageFrom을 주지 않으면 된다.
``` json
{
  // https://stackoverflow.com/questions/50863312/jest-gives-cannot-find-module-when-importing-components-with-absolute-paths
  // moudle index.ts 해결
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "rootDir": ".",
  "testMatch": [
    "<rootDir>/src/**/*spec.ts"
  ],
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  // jest env file test 
  "setupFiles": [
    "<rootDir>/jest/envSetup.ts"
  ],
  "collectCoverage": true,
  "globals": {
    "ts-jest": {
      "tsconfig": "<rootDir>/tsconfig.json"
    }
  }
}
```

# Jest 정리

- @submodule에서는 unit test만 진행하면 됨으로 별도 package.json으로 만들어야함
- nestjs에서는 service, moudle -> unit test controller -> e2e 테스트
- 각 모듈마다 spec은 필수 및 controller, socket 경우는 test
