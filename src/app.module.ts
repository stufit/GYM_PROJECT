import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'Joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './repositories/entities/user.entity';
import { VerificationEntity } from './repositories/entities/verification.entity';
import { GoogleStrategy } from './user/strategy/google.strategy';
import { GymModule } from './gym/gym.module';
import * as process from 'process';
import { GymEntity } from './repositories/entities/gym.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 어플리케이션의 어디서나 config 모듈에 접근할 수 있음
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod', // 서버에 배포시에는 환경변수 파일을 사용하지 않음
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid('dev', 'prod').required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        PRIVATE_KEY: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT, // + 를 붙이면 string으로 변환해준다.
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: true,
      entities: [UserEntity, VerificationEntity, GymEntity], //**은 모든 디렉토리,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      context: ({ req }) => ({ user: req['user'] }),
    }),
    UserModule,
    GymModule,
  ],

  controllers: [],
  providers: [GoogleStrategy],
})
export class AppModule {}
