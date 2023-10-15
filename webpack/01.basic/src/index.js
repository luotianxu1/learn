import './index.css';
import './less.less';
import './sass.scss';

import png from './images/logo.png';
import ico from './images/logo.ico';
import jpg from './images/logo.jpg';
import txt from './images/logo.txt';

console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV2);
console.log(png);
console.log(ico);
console.log(jpg);
console.log(txt);

// function readonly(target, key, descriptor) {
//     descriptor.writable = false
// }

// class Person {
//     @readonly PI = 3.14
// }
// let p1 = new Person()
// p1.PI = 3.15
// console.log(p1.PI)
