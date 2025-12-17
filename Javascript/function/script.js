function nice(name) {
    console.log("Hey " + name + " you are nice!")
    console. log("Hey " + name + " your tshirt is nice!")
    console.log("Hey " + name + " vou are good!")
    console.log("Hey " + name + " your course is good too!")
}
nice("Harry")

function sum(a,b,c=10) {
    console.log(a,b,c)
    return a+b+c
}
console.log(sum(10,20))
console.log(sum(10,20,5))
console.log(sum(80,20))
console.log(sum(80))

const fun1=(a,b)=>{
    console.log(a,b)
}

fun1(10,20)