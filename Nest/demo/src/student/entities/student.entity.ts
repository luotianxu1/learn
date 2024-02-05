import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Student {
  @Field(() => Int, { description: '学生姓名示例' })
  exampleField: number;
}
