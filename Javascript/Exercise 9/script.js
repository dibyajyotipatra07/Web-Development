//faulty calculator
let a= Number(prompt("Enter 1st number"))
let b= Number(prompt("Enter 2nd number"))
let op= prompt("Enter operator")
let ran=Math.random()
function calculator(a,b,op){
    if (op=='+') {
        console.log(a+b)
    }
    else if (op=='-') {
        console.log(a-b)
    }
    else if (op=='*') {
        console.log(a*b)
    }
    else{
        console.log(a/b)
    }
}
function faultyCalculator(a,b,op){
    if (op=='+') {
        console.log(a-b)
    }
    else if (op=='-') {
        console.log(a/b)
    }
    else if (op=='*') {
        console.log(a+b)
    }
    else{
        console.log(a**b)
    }
}
if (ran<.1) {
    calculator(a,b,op)
}
else{
    faultyCalculator(a,b,op)
}