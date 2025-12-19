//random color generator
function rColor() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;
    let rcolor=[r,g,b];
    return rcolor;
}
document.querySelectorAll(".box").forEach(box=>{
    box.style.backgroundColor = `rgb(${rColor()})`;
    box.style.color = `rgb(${rColor()})`;
})