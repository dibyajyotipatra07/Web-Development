let a = 1;
for (let i = 0; i < 100; i++) {
    console.log(a + i)
}

let obj = {
    name: "Harry",
    role: "Programmer",
    company: "CodeWithHarry AI"
}
for (key in obj) {
    console.log(key, obj[key])
}

for (const c of "Dibyajyoti") {
    console.log(c);
}
let i = 1;
while (i < 6) {
    console.log(i);
    i++
}
let j = 10;
do {
    console.log(j);
} while (i < 6);