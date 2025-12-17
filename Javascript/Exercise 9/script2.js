let a = Number(prompt("Enter 1st number"))
let b = Number(prompt("Enter 2nd number"))
let op = prompt("Enter operator")
let ran = Math.random()
let obj = {
    "+": "-",
    "*": "+",
    "-": "/",
    "/": " ** "
}

if (ran>.1) {
    alert(`The result is: ${eval(`${a} ${op} ${b}`)}`)
}
else{
    alert(`The result is: ${eval(`${a} ${obj[op]} ${b}`)}`)
}