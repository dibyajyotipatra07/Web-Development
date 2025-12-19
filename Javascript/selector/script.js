console.log("Script loaded");
// let boxes = document.getElementsByClassName("box");
// console.log(boxes);

// boxes[4].style.backgroundColor = "lightblue";
// document.getElementById("redbox").style.backgroundColor = "red";
// console.log(document.querySelector(".box"));
// console.log(document.querySelectorAll(".box"));

// document.querySelector(".box").style.backgroundColor = "yellow";
// document.querySelectorAll(".box").forEach(element => {
//     element.style.backgroundColor = "yellow";
// });

console.log(document.getElementsByTagName("div"));
console.log(document.getElementsByTagName("div")[3].matches("#redbox"));
console.log(document.getElementsByTagName("div")[3].closest(".container"));
console.log(document.getElementsByTagName("div")[3].closest("html"));
console.log(document.querySelector(".container").contains(document.getElementById("redbox")));
