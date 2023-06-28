import { InputType, ObjectType } from '@nestjs/graphql';
import { v4 as uuidv4 } from 'uuid';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@InputType({ isAbstract: true })
@ObjectType()
@Entity({ name: 'VERIFICATION' })
export class VerificationEntity {
  @PrimaryGeneratedColumn({
    name: 'VERIFICATION_NO',
    type: 'bigint',
    comment: '검증키',
  })
  verificationNo: string;

  @Column({ name: 'CODE', type: 'varchar', comment: '코드' })
  code: string;

  @OneToOne((type) => UserEntity, { onDelete: 'CASCADE' }) // ondelete=cascade 는 만약 user가 삭제되면 해당 verification도 삭제한다는 의미이다
  @JoinColumn({ name: 'USER_NO', referencedColumnName: 'userNo' }) // userNo는 userEntity의 userNo를 참조한다는 의미이다
  userNo: UserEntity;

  @CreateDateColumn({
    type: 'timestamp',
    name: 'CREATED_AT',
    comment: '생성일자',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    name: 'UPDATED_AT',
    comment: '수정일자',
  })
  updatedAt: Date;

  @BeforeInsert() // db에서 code에 랜덤문자 자동생성
  createCode(): void {
    this.code = uuidv4();
  }
}
