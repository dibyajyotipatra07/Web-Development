//Factorial
let number = 5
let temp = number
let factorial = 1
for (let i = temp; i > 0; i--) {
    factorial *= i;
}
console.log(factorial);

let array1 =[]
while (temp!=0) {
    array1.push(temp)
    temp--
}
console.log(array1.reduce((a,b)=>{
    return a*b
}));