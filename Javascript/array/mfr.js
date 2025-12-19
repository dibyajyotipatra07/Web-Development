let arr1=[1,2,3,4,5,6];
let newArr=[]
for (let i = 0; i < arr1.length; i++) {
    const element = arr1[i];
    newArr.push(element**2);
}
console.log(newArr);

newArr=[]
newArr=arr1.map(ele => {
    return ele**2
})
console.log(newArr);



const NumberGreaterThanFour = (value)=>{
    if (value>4) {
        return true
    }
    return false
}
console.log(newArr.filter(NumberGreaterThanFour))

const red=(a,b)=>{
    return a+b
}
console.log(arr1.reduce(red))




console.log(Array.from('hello'))
