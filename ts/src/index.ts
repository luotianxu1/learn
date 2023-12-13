// function Echo(val: string) {
//   return (
//     target: any,
//     key?: string,
//     descriptor?: PropertyDescriptor | number
//   ) => {
//     console.log(val);
//   };
// }

// //最后执行的
// @Echo("类装饰器4")
// @Echo("类装饰器3")
// @Echo("类装饰器2")
// @Echo("类装饰器1") // 装饰器是倒序执行的
// class Flow {
//   // 倒数第二个执行的
//   constructor(@Echo("构造函数参数装饰器") val: string) {}

//   // 以下两个谁先写谁执行
//   @Echo("静态方法装饰器")
//   static getType() {
//     return this.type;
//   }
//   @Echo("静态属性装饰器")
//   static type = "Flow";

//   // 以下三个谁先写 谁执行
//   @Echo("属性访问器装饰器")
//   get value() {
//     return "abc";
//   }
//   @Echo("原型方法装饰器")
//   eat(@Echo("参数装饰器") val: string) {}
//   @Echo("实例属性装饰器")
//   public namne!: string;
// }

// 方法和属性之间没有顺序关系 谁先写谁先执行

// 我们是否可以在类的装饰器里面处理所有流程

// reflect-metadata 反射元数据
// 元数据含义是 用于描述数据的数据， 将信息存到map表中 ，最终统一操作
// @nestjs

// import "reflect-metadata";
// @Reflect.metadata("Class", "animal metata")
// class Animal {
//   @Reflect.metadata("Class property", "type metadata") // 静态属性  target描述的是类
//   static type = "哺乳类";
//   @Reflect.metadata("proto method", "eat metadata") // 原型方法  target描述的是原型
//   eat() {}
//   drink() {}
// }

/*
 weakMap => {
    Animal:{
        undefined:{Class:Class metadata}
        type:{Class property:type metadata}
    },
    Animal.prototype:{
        eat:{proto method:eat metadata}
        drink:{proto method:dirnk metadata}
    }
}
*/
// 在类的装饰器中取出来我存储的信息
// console.log(Reflect.getMetadataKeys(Animal));
// console.log(Reflect.getMetadataKeys(Animal.prototype));
// console.log(Reflect.getMetadata("Class", Animal));
// console.log(Reflect.getMetadata("Class property", Animal, "type"));
// 命令式  -》 声明式
// 这个地方都在类中定义
// Reflect.defineMetadata("Class", "Class metadata", Animal);
// Reflect.defineMetadata("Class property", "type metadata", Animal, "type");
// Reflect.defineMetadata("proto method", "eat metadata", Animal.prototype, "eat");
// Reflect.defineMetadata(
//   "proto method",
//   "dirnk metadata",
//   Animal.prototype,
//   "drink"
// );

import 'reflect-metadata'
const REQUIRED_KEY = Symbol('REQUIRED_KEY')
function Required() {
    return (target: any, prop: string) => {
        const requiredKeys = Reflect.getMetadata(REQUIRED_KEY, target) || []

        Reflect.defineMetadata(REQUIRED_KEY, [...requiredKeys, prop], target)
    }
}

class Person {
    @Required()
    name!: string
    @Required()
    age!: number
}

const instance = new Person()
// instance.name = "abc";
console.log(instance)

validate(instance)
function validate(instance: any) {
    let exisitsKeys = Object.keys(instance) // 获取已经存在的属性

    let requiredKeys = Reflect.getMetadata(REQUIRED_KEY, instance) // 获取刚才在类中定义的元数据

    for (const key of requiredKeys) {
        if (!exisitsKeys.includes(key)) {
            throw new Error(key + 'is required')
        }
        //  else {
        //   if (instance[key] == undefined) {
        //     throw new Error(key + " is required");
        //   }
        // }
    }
}

// 如果到时候 new完之后 这两个属性没有 说明没有填写

export {}
