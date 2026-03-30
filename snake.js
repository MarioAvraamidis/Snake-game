// game
const blockSize = 25;
const rows = 24;
const cols = 25;
var board;
var ctx;
// initial position
const startX = 5;
const startY = 5;
// snake body
var snakeBody; // = [[headX,headY]];
// velocity
var velocityX; // = 0;
var velocityY; // = 0;
// food position
var foodX; // = (2*startX+1)*blockSize;
var foodY; // = (2*startY+1)*blockSize;
// crash
var crash; // = false
// speed
var speed;
var gameInterval;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    ctx = board.getContext("2d");   // used for drawing on the board

    initializeGame(10);
    document.addEventListener("keyup", changeDirection);
    gameInterval = setInterval(update, 1000/speed);  // ms
}

function update(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, board.width, board.height)

    for(i = snakeBody.length-1; i > 0; i--)
    {
        snakeBody[i][0] = snakeBody[i-1][0]
        snakeBody[i][1] = snakeBody[i-1][1]
    }
    snakeBody[0][0] += velocityX * blockSize
    snakeBody[0][1] += velocityY * blockSize
    
    // check crash
    for (i = 1; i < snakeBody.length; i++)
        if(snakeBody[i][0] == snakeBody[0][0] && snakeBody[i][1] == snakeBody[0][1])
            crash = true;
    if(snakeBody[0][0] < 0 || snakeBody[0][0] >= cols*blockSize || snakeBody[0][1] < 0 || snakeBody[0][1] >= rows*blockSize)
        crash = true;
    if(crash)
    {
        // console.log("EMPIKE");
        spd = prompt("Game Over. Your score: " +String(snakeBody.length)+ ". Choose speed level (1-20)");
        console.log(spd);
        initializeGame(spd);
    }

    // draw food
    ctx.fillStyle = "lime";
    ctx.fillRect(foodX, foodY, blockSize, blockSize);

    // draw snake
    ctx.fillStyle = "blue";
    for(i = 0; i < snakeBody.length; i++)
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);

    // eat food
    if(snakeBody[0][0] == foodX && snakeBody[0][1]==foodY)
    {
        snakeBody.push([foodX,foodY]);
        foodX = randomInt(cols) * blockSize
        foodY = randomInt(rows) * blockSize
    }
}

function changeDirection(e){
    // console.log(e);
    if(e.code == "ArrowUp" && velocityY == 0)
    {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY == 0)
    {
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowRight" && velocityX == 0)
    {
        velocityX = 1;
        velocityY = 0;
    }
    else if(e.code == "ArrowLeft" && velocityX == 0)
    {
        velocityX = -1
        velocityY = 0
    }
    // console.log(...[velocityX,velocityY]);
}

function randomInt(max){
    return Math.floor(Math.random()*max);
}

function initializeGame(spd = 10){
    // console.log("initialize");
    snakeBody = [[startX * blockSize, startY * blockSize]];
    if(spd<1)
        spd = 1;
    else if (spd > 20)
        spd = 20;
    speed = spd
    console.log("speed "+String(speed))
    foodX = (2*startX+1)*blockSize;
    foodY = (2*startY+1)*blockSize;
    velocityX = 0;
    velocityY = 0;
    crash = false;
    clearInterval(gameInterval);
    gameInterval = setInterval(update, 1000 / speed);
}