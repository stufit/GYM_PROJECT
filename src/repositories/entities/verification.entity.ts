import {Field, InputType, Int, ObjectType} from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {UserEntity} from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({name: 'VERIFICATION'})
export class VerificationEntity{
  @Field((type) => Int,{nullable:false,description:"검증키"})
  @PrimaryGeneratedColumn({name:'VERIFICATION_NO'})
  verificationNo: number;

  @Column({name:'CODE'})
  @Field((type) => String)
  code: string;

  @OneToOne((type) => UserEntity, { onDelete: 'CASCADE' }) // ondelete=cascade 는 만약 user가 삭제되면 해당 verification도 삭제한다는 의미이다
  @JoinColumn({name:'USER_NO'})
  user: UserEntity;

  @Field(()=>Date,{description:'생성일자'})
  @CreateDateColumn({type:'timestamp',name:'CREATED_AT'})
  createdAt: Date;

  @Field(()=>Date,{description:'수정일자'})
  @UpdateDateColumn({type:'timestamp',name:'UPDATED_AT'})
  updatedAt: Date;

  @BeforeInsert() // db에서 code에 랜덤문자 자동생성
  createCode(): void {
    this.code = uuidv4();
  }
}
