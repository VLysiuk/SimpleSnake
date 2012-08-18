var gameBoard;
var snake;
var moveDirection = 'right';
var gameExecutor;
var gameSpeed=100;

//actual field size(400px) divided by corresponding bodypart size(8px)
var gameFieldRelativeWidth = 50;
var gameFieldRelativeHeight = 50;

//width and height of snake body element
var snakeElementWidth = 8;
var snakeElementHeight = 8;

var food;

$(document).ready(function() {
    $('body').keydown(keyPressedHandler);
});

function move() {
	generateFood();
	snake.move(moveDirection);
	
	if(snake.holdsPosition(food.xPos,food.yPos))
		eatFood();
		
	drawSnake();
};

function keyPressedHandler(e) {
	var code = (e.keyCode ? e.keyCode : e.which);
	
	switch(code) {
		case 37:
			moveDirection = 'left';
			break;
		case 38:
			moveDirection = 'up';
			break;
		case 39:
			moveDirection = 'right';
			break;
		case 40:
			moveDirection = 'down';
			break;
		case 32:
			startGame();
			break;
		case 27:
			endGame();
			break;
	}
 }

function startGame() {
	gameBoard = new GameBoard();
	moveDirection = 'right';
	endGame();
	
	snake = new Snake(80,80);
	drawSnake();
	gameExecutor = setInterval(move,gameSpeed);
};
function endGame() {
	if(gameExecutor)
		clearInterval(gameExecutor);
	
	gameBoard.clearBoard();
};

function drawSnake() {
	gameBoard.removeSnakeBody();
	
	//draw the new snake
	var snakeBody = snake.getBody();
	
	for(var i=0; i<snakeBody.length; i++){
		gameBoard.drawElement('bodypart',snakeBody[i].xPos,snakeBody[i].yPos);
	}
};

function generateFood() {
	if(gameBoard.hasNoCreatedFood()){
		do{
			xpos = Math.floor(Math.random() * gameFieldRelativeWidth) * snakeElementWidth;
			ypos = Math.floor(Math.random() * gameFieldRelativeHeight)* snakeElementHeight;
		}
		while(snake.holdsPosition(xpos,ypos));
		food = {xPos:xpos,yPos:ypos};
		gameBoard.drawElement('food',xpos,ypos);
	}
};

function eatFood() {
	snake.eatFood();
	gameBoard.removeSnakeFood();
	
	gameBoard.updateScore();
};