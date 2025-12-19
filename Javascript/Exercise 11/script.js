//Factorial
// let number = 5
// let temp = number
// let factorial = 1
// for (let i = temp; i > 0; i--) {
//     factorial *= i;
// }
// console.log(factorial);

// let array1 =[]
// while (temp!=0) {
//     array1.push(temp)
//     temp--
// }
// console.log(array1.reduce((a,b)=>{
//     return a*b
// }));


let a = 6

function factorial(number) {
    let arr = Array.from(Array(number + 1).keys())
    let c = arr.slice(1,).reduce((a, b) => a * b)
    return c
}

console.log(factorial(a));

