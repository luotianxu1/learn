console.log(require('dotenv').config({ debug: true }).parsed)

let result = 'console.log(kkk.yyy.XXX);'.replace('kkk.yyy.XXX', '"development"')
console.log(result)
