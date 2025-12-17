// and shop name and another word

// Adjectives :
// Crazy
// Amazing
// Fire

// Shop Name :
// Engine
// Foods
// Garments

// Another Word:
// Bros
// Limited

let Adjectives={
    0:"Crazy",
    1:"Amazing",
    2:"Fire"
}
let ShopName={
    0:"Engine",
    1:"Foods",
    2:"Garments"
}
let AnotherWord={
    0:"Bros",
    1:"Limited",
    2:"Hub"
}
let ran1=Math.floor(Math.random()*3)
let ran2=Math.floor(Math.random()*3)
let ran3=Math.floor(Math.random()*3)

console.log(`${Adjectives[ran1]} ${ShopName[ran2]} ${AnotherWord[ran3]}`)
