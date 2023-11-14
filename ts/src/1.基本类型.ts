let name: string = 'jiang'
let age: number = 30
let male: boolean = true

// 原始数据类型 都要采用小写的类型， 大写类型（包装的类型）用来描述的实例

// let s1: string = 'abc'
// let s2: string = new String('abc')
// let s3: String = new String('abc')
// let s4: String = 'abc'

// "abc".charAt // 默认当我们调用基本类型的方法时 会将当前基本类型包装成对象类型

// ts中有两种方式可以标注数组类型
let arr1: number[] = [1, 2, 3, 4]
let arr2: string[] = ['a', 'b', 'c', 'd']
let arr3: (string | number)[] = [1, 2, 3, 4, 'a', 'b', 'c', 'd']
let arr4: Array<string> = ['a', 'b', 'c'] // 采用泛型来声明数组

// ts 中的元组 （特点就是长度固定、类型固定）
let tuple: [name: string, age: number, male: boolean] = ['jw', 30, true]

// 元组可以通过数组的方法 进行新增。 只能新增已经存在的类型。 而且就算放进去了也拿不出来

// 3） ts中的枚举 自带类型的对象, 枚举的值 如果没有赋值 从0开始 递增的. 反举 只能在我们值为数字的情况
// 状态码 、 接口的定义  、权限、 标示位
const enum USER_ROLE { // 像代码中的常量 可以全部采用枚举类型，提示友好,使用方便
    USER = 'a',
    ADMIN = 10,
    SUPER_ADMIN,
}
// 常量枚举不能反举 （一般用不到反举，都采用常量枚举） 不会生成对象，而是直接将值拿出来了

// 4) null undefined 默认情况下  null 和 undefined 只能赋予给 null undefined

const n: null = null
const u: undefined = undefined

// 如果在非严格null检测的情况下 ， 那么undefined 和 null 是任何类型的子类型

let string: string = 'abc'

// 5) void 类型 空类型  函数的返回值 可以用void来标识， 其他情况下用不到
// undefined 区别 void

function fn1() {}
function fn2() {
    return
}
function fn3(): void | null {
    // undefined 可以赋予给void
    return null
}

// never 类型  任何类型的子类型， never意味着 这个值不可能出现

// - 1) 函数无法到达终点
function whileTrue(): never {
    while (true) {}
}
function throwError(): never {
    throw new Error()
}

// 校验逻辑的完整性 可以利用never特性  实现完整性保护
function validateCheck(v: never) {}
function getResult(strOrBooleanOrNum: string | number | boolean) {
    // 在内部写js逻辑的时候 要对每种类型做处理
    // 如果是字符串 'abc' -> [ a , b ,c]
    // 123 => [1,2,3]
    // true => [t,r,u,e]
    if (typeof strOrBooleanOrNum === 'string') {
        return strOrBooleanOrNum.split('')
    } else if (typeof strOrBooleanOrNum == 'number') {
        return strOrBooleanOrNum.toString().split('')
    } else if (typeof strOrBooleanOrNum == 'boolean') {
        return strOrBooleanOrNum.toString().split('')
    } else {
        validateCheck(strOrBooleanOrNum)
        return []
    }
    //如果达不到never 则可以正常的运行
    //   let n: never = strOrBooleanOrNum;
}

export {}
