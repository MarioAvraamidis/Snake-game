// game
const blockSize = 25;
const rows = 24;
const cols = 25;
var board;
var ctx;
// initial position
const startX = 5;
const startY = 5;
// snake's head position
headX = startX * blockSize;
headY = startY * blockSize;
// snake body
snakeBody = [[headX,headY]];
// velocity
velocityX = 0;
velocityY = 0;
// food position
foodX = (2*startX+1)*blockSize;
foodY = (2*startY+1)*blockSize;
// crash
crash = false

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    ctx = board.getContext("2d");   // used for drawing on the board

    document.addEventListener("keyup", changeDirection);
    this.setInterval(update, 200);  // 200 ms
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
        alert("Game Over. Your score: "+String(snakeBody.length))

    // draw food
    ctx.fillStyle = "lime";
    ctx.fillRect(foodX, foodY, blockSize, blockSize);

    // draw snake
    ctx.fillStyle = "blue";
    for(i = 0; i < snakeBody.length; i++)
        {// console.log(i,snakeBody[i])
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);}

    // eat food
    if(snakeBody[0][0] == foodX && snakeBody[0][1]==foodY)
    {
        snakeBody.push([foodX,foodY]);
        foodX = randomInt(cols) * blockSize
        foodY = randomInt(rows) * blockSize
        // console.log("EAT");
    }
    // console.log(snakeBody)
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