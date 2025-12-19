console.log("Script loaded successfully."); 
console.log(document.body)
console.log(document.body.childNodes)
console.log(document.body.childNodes[0])
console.log(document.body.childNodes[1])
let cont=document.body.childNodes[1];
console.log(document.body.childNodes[1].childNodes)
console.log(cont.firstChild)
console.log(cont.lastChild)
console.log(cont.firstElementChild)
console.log(cont.lastElementChild)

console.log(cont.lastElementChild.style.color="red")
console.log(cont.lastElementChild.parentElement)
console.log(document.body.firstElementChild.children)
console.log(document.body.firstElementChild.children[1].previousElementSibling)
console.log(document.body.firstElementChild.children[1].nextElementSibling)