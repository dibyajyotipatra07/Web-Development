let fruits = ["Banana","Orange","Apple","Mango"]
for (let i = 0; i < fruits.length; i++) {
    const element = fruits[i];
    console.log(element);
}

fruits.forEach((element,index, fruits) => {
    console.log(element + " at index " + index);
});

let Obj = {
    name: "John",
    age: 30,
    city: "New York"
}
for (const key in Obj) {
    if (!Object.hasOwn(Obj, key)) continue;
    const element = Obj[key];
    console.log(element);    
}
for (const value of fruits) {
    console.log(value);
}