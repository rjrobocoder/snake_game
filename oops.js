//creating objects with the help of new keyword

// function fruit(taste, color) {
//     this.color = color;
//     this.taste = taste;
// }

// //new keyword
// let mango = new fruit("sweet", "yellow");
// let apple = new fruit("sweet", "red");

//classes are also functions 
//Class declaration (can be hoisted)
class fruitClass{
    constructor(taste, color) {
        this.taste = taste;
        this.color = color;
    }
};

let kiwi = new fruitClass("sour", "green");

//class expression (can not be hoisted)
let fruitclass2 = class{
    constructor(taste, color){
        this.taste = taste;
        this.color = color;
    }
};

let kiwi2 = new fruitclass2("sour", "green");