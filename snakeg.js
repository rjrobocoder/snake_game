function init() {
    console.log("in init function");
    
    canvas = document.getElementById('mycanvas');
    W = canvas.width = 700;
    H = canvas.height = 700;
    //current size of the array(snake)
    pen = canvas.getContext('2d');
    cs = 40;
    score = 5;
    gameover = false;

    //create an image object for the food
    food_img = new Image();
    food_img.src = ("assests/apple.jpg")

    trophy_img = new Image();
    trophy_img.src = "assests/trophy.jpg";


    //global object
    food = getRandomFood();

    snake = {
        init_len : 5,
        color : "orange",
        cells : [],
        direction : "right",
        speed : 5,

        createSnake: function() {
            for(var i=this.init_len; i >= 0;i--) {
                this.cells.push({x:i, y:0});
            }
        },
        //we have to call it only in the draw method
        drawSnake: function() {
            for(var i =0;i<this.cells.length;i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x*cs, this.cells[i].y*cs,cs-2, cs-2);
            }
        },

        updateSnake: function() {
            //This function is getting called from the update function
            //to insert at the front we need to know about the headx and heady
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;

            //logic to increase the length of the snake if it collide with the food
            if(headX === food.x && headY === food.y) {
               //both of them are at the same location
               console.log("food eaten by the snake");
               //this will give us new coordinates and the draw function will draw the food at a new location
               food = getRandomFood(); 
               score++;
            }else{
                
            //in our previous code we are always checking pop out the last cell but here we are checkng the condition if not then we are adding a cell to the end of the snake.    
            //this will pop the last cell and add it to the front
            this.cells.pop();
            }
           
            //to move the snake in the right direction
            //i will have a new head
            //var X = headX + 1;
            //var Y = headY;

            var nextX, nextY;

            if(this.direction === "right") {
                nextX = headX + 1;
                nextY = headY;
            }else if(this.direction === "left") {
                nextX = headX - 1;
                nextY = headY;
            }else if(this.direction === "down") {
                nextX = headX;
                nextY = headY + 1;
            }else{
                nextX = headX;
                nextY = headY - 1;
            }
              
            // this.cells[0].x += this.speed;
            // if(this.cells[0].x >= W-cs-2) {
            //     this.speed *= -1;
            //   }

            //console.log(W-cs/cs);

            this.cells.unshift({x: nextX, y: nextY});

        
            //write the logic to prevent the snake to go out
            var last_X = Math.round(W/cs);
            var last_Y = Math.round(H/cs);

            if(this.cells[0].x < 0 || this.cells[0].y < 0 || this.cells[0].x >  last_X || this.cells[0].y > last_Y) {
                gameover = true;
            }
        }

    };

    snake.createSnake();

    function keyPressed(e) {
        //console.log("key pressed ", e.key);
        //we have to use the conditions to simulate the movement.
        if(e.key === "ArrowRight"){
           snake.direction = "right";
        }else if(e.key === "ArrowLeft") {
            snake.direction = "left";
        }else if(e.key === "ArrowDown") {
            snake.direction = "down";
        }else{
            snake.direction = "up";
        } 
    }

    //add event listeners to the document object.
    document.addEventListener('keydown', keyPressed);
   
}


function draw() {
   
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    //we have to scale the coordinates by a factor cs.s 
    pen.fillStyle = food.color;
    pen.drawImage(food_img,food.x*cs, food.y*cs, cs, cs);
    
    pen.drawImage(trophy_img,18, 20, cs, cs);
    pen.font = "20px Roboto"
    pen.fillText(score, 50, 50);
    
}

function update() {
    
    //console.log("in update");
    snake.updateSnake();
}

//we can call it on the draw function but before that we should have the food position
function getRandomFood() {
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(H-cs)/cs);

    //json object for random food coordinate
    var food = {
        x: foodX,
        y: foodY,
        color: "red",
    }
    return food;
}

function gameloop() {

    if(gameover === true) {
       clearInterval(f);
       alert("game over");
       return;
    }
   
    draw();
    update();
}
var f = setInterval(gameloop, 100);

init();